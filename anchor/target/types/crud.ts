/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/crud.json`.
 */
export type Crud = {
  "address": "FPHQ1sMbRbHyJuBDHwYU8q15W4FdFQT1Zvc3LVsgwYYK",
  "metadata": {
    "name": "crud",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with anchor"
  },
  "instructions": [
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "crudAccount",
          "writable": true,
          "signer": true
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "crudAccount",
      "discriminator": [
        34,
        253,
        30,
        207,
        101,
        107,
        247,
        136
      ]
    }
  ],
  "types": [
    {
      "name": "crudAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "data",
            "type": "string"
          }
        ]
      }
    }
  ]
};
