import NFTDiary from "../contracts/NFTDiary.cdc"
// import NFTDiary from 0x6f48f852926e137a

pub fun main(addr: Address): [{String: String}] {
    let metadataArray: [{String: String}] = []
    let collectionCapability = getAccount(addr).getCapability<&{NFTDiary.NFTDiaryCollectionPublic}>(NFTDiary.CollectionPublicPath)
    if !collectionCapability.check() {
        return metadataArray
    }
    let collection = collectionCapability.borrow()!
    let ids = collection.getIDs()
    for id in ids {
        let token = collection.borrowNFTDiary(id: id)
        let metadata = token.metadata
        metadata["id"] = token.id.toString()
        metadataArray.append(metadata)
    }
    return metadataArray
}