import NFTDiary from "../contracts/NFTDiary.cdc"
// import NFTDiary from 0x6f48f852926e137a

transaction(metadata: {String: String}) {
    prepare(acct: AuthAccount) {
        // Setup Collection
        if acct.borrow<&NFTDiary.Collection>(from: NFTDiary.CollectionStoragePath) == nil {
            acct.save(<- NFTDiary.createEmptyCollection(), to: NFTDiary.CollectionStoragePath)
            acct.link<&{NFTDiary.NFTDiaryCollectionPublic}>(NFTDiary.CollectionPublicPath, target: NFTDiary.CollectionStoragePath)
        }

        // Setup Minter
        if acct.borrow<&NFTDiary.Minter>(from: NFTDiary.MinterStoragePath) == nil {
            acct.save(<- NFTDiary.createMinter(), to: NFTDiary.MinterStoragePath)
        }

        // Mint and Deposit NFT
        let minter = acct.borrow<&NFTDiary.Minter>(from: NFTDiary.MinterStoragePath)!
        let receiverRef = acct.getCapability(NFTDiary.CollectionPublicPath).borrow<&{NFTDiary.NFTDiaryCollectionPublic}>()
            ?? panic("Cannot borrow a reference to the recipient's Replica collection")
        let token <- minter.mintNFT(metadata: metadata)
        receiverRef.deposit(token: <- token)

        log("Mint NFT succeeded")
    }
}
