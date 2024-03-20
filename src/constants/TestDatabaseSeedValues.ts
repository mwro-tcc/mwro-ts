export const TestDatabaseCommonValues = {
    user1: {
        uuid: "08e462af-4c7f-431e-9c88-4b07b4662438",
        email: "testuser@email.com",
        unhashedPassword: "12345678", // To be used in sign-in
        password: "7f7ad1523d09022bb24e267fea4633857dee6b0d6d524aca06aa15191c9b5e2a", // Stored in DB
        salt: "6160bb1eb39ff29f5bebe402c4a9e459",
    },
    community1: {
        uuid: "ffe0b40d-f329-4822-9e4e-1c4a0ad6155f",
        admin1: {
            uuid: "66bba4cf-1489-441d-a0d4-b2bc9aec0ba5",
            userUuid: "08e462af-4c7f-431e-9c88-4b07b4662438", // user1
            communityUuid: "ffe0b40d-f329-4822-9e4e-1c4a0ad6155f", // community1
        },
        store1: {
            uuid: "95c5d341-117a-4f4e-ab98-577592512ff0",
            userUuid: "08e462af-4c7f-431e-9c88-4b07b4662438", // user1
            communityUuid: "ffe0b40d-f329-4822-9e4e-1c4a0ad6155f", // community1
            product1: {
                uuid: "f2d82fe5-a88e-4c54-9d60-51f1848b681c",
                storeUuid: "95c5d341-117a-4f4e-ab98-577592512ff0",
            },
        },
    },

    //
    user2: {
        uuid: "79f0c3cf-6e3a-4902-b3ca-910d0811ed25",
        email: "testuser2@email.com",
        salt: "d34087171cbe00fdb81b2f30b83df4fb",
        unhashedPassword: "123456789", // To be used in sign-in
        password: "69bc8be7a83ad874a6be42f87b8e4429bd3a8ffd55535ea91f9096ccac56361d", // Stored in DB
    },
};
