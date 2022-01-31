// import NonFungibleToken from "./NonFungibleToken.cdc"
import NonFungibleToken from 0x631e88ae7f1d7c20 // Testnet

pub contract NFTDiary: NonFungibleToken {
    pub var totalSupply: UInt64
    pub event ContractInitialized()
    pub event Withdraw(id: UInt64, from: Address?)
    pub event Deposit(id: UInt64, to: Address?)

    pub let CollectionStoragePath: StoragePath
    pub let CollectionPublicPath: PublicPath
    pub let MinterStoragePath: StoragePath

    pub resource NFT: NonFungibleToken.INFT {
        pub let id: UInt64
        pub let metadata: {String: String}

        init(metadata: {String: String}) {
            NFTDiary.totalSupply = NFTDiary.totalSupply + 1 as UInt64
            self.id = NFTDiary.totalSupply
            self.metadata = metadata
        }
    }

    pub resource Minter {
        pub fun mintNFT(metadata: {String: String}): @NFT {
            return <- create NFT(metadata: metadata)
        }
    }

    pub resource interface NFTDiaryCollectionPublic {
        pub fun deposit(token: @NonFungibleToken.NFT)
        pub fun batchDeposit(tokens: @NonFungibleToken.Collection)
        pub fun getIDs(): [UInt64]
        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT
        pub fun borrowNFTDiary(id: UInt64): &NFTDiary.NFT
    }

    pub resource Collection: NFTDiaryCollectionPublic, NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic {
        pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT}

        init() {
            self.ownedNFTs <- {}
        }

        pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT {
            let token <- self.ownedNFTs.remove(key: withdrawID) ?? panic("Cannot withdraw: NFTDiary does not exist in the collection.")
            emit Withdraw(id: token.id, from: self.owner?.address)
            return <- token
        }

        pub fun batchWithdraw(ids: [UInt64]): @NonFungibleToken.Collection {
            let batchCollection <- create Collection()
            for id in ids {
                batchCollection.deposit(token: <-self.withdraw(withdrawID: id))
            }
            return <- batchCollection
        }

        pub fun deposit(token: @NonFungibleToken.NFT) {
            let token <- token as! @NFTDiary.NFT
            if self.owner?.address != nil {
                emit Deposit(id: token.id, to: self.owner?.address)
            }
            self.ownedNFTs[token.id] <-! token
        }

        pub fun batchDeposit(tokens: @NonFungibleToken.Collection) {
            for key in tokens.getIDs() {
                self.deposit(token: <- tokens.withdraw(withdrawID: key))
            }
            destroy tokens
        }

        pub fun getIDs(): [UInt64] {
            return self.ownedNFTs.keys
        }

        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
            return &self.ownedNFTs[id] as &NonFungibleToken.NFT
        }

        pub fun borrowNFTDiary(id: UInt64): &NFTDiary.NFT {
            let ref = &self.ownedNFTs[id] as auth &NonFungibleToken.NFT
            return ref as! &NFTDiary.NFT
        }

        destroy() {
            destroy self.ownedNFTs
        }
    }

    pub fun createMinter(): @Minter {
        return <- create Minter()
    }

    pub fun createEmptyCollection(): @NonFungibleToken.Collection {
        return <- create NFTDiary.Collection()
    }

    init() {
        self.CollectionStoragePath = /storage/NFTDiaryCollection000
        self.CollectionPublicPath = /public/NFTDiaryCollection000
        self.MinterStoragePath = /storage/NFTDiaryMinter000

        self.totalSupply = 0
        self.account.save<@Collection>(<- create Collection(), to: self.CollectionStoragePath)
        self.account.link<&{NFTDiaryCollectionPublic}>(self.CollectionPublicPath, target: self.CollectionStoragePath)
        emit ContractInitialized()
    }
}
