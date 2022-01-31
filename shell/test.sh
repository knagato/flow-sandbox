# flow emulator --dev-wallet

flow project deploy

flow transactions send ./cadence/transactions/mint_nft.cdc \
  --args-json '[
    {
      "type": "Dictionary",
      "value": [
        {
          "key": { "type": "String", "value": "title" },
          "value": { "type": "String", "value": "title 1" }
        },
        {
          "key": { "type": "String", "value": "body" },
          "value": { "type": "String", "value": "sample text" }
        },
        {
          "key": { "type": "String", "value": "author" },
          "value": { "type": "String", "value": "0xf8d6e0586b0a20c7" }
        },
        {
          "key": { "type": "String", "value": "timestamp" },
          "value": { "type": "String", "value": "1643586380259" }
        }
      ]
    }
  ]'

flow transactions send ./cadence/transactions/mint_nft.cdc \
  --args-json '[
    {
      "type": "Dictionary",
      "value": [
        {
          "key": { "type": "String", "value": "title" },
          "value": { "type": "String", "value": "title 2" }
        },
        {
          "key": { "type": "String", "value": "body" },
          "value": { "type": "String", "value": "sample text 2" }
        },
        {
          "key": { "type": "String", "value": "author" },
          "value": { "type": "String", "value": "0xf8d6e0586b0a20c7" }
        },
        {
          "key": { "type": "String", "value": "timestamp" },
          "value": { "type": "String", "value": "1643586380259" }
        }
      ]
    }
  ]'

