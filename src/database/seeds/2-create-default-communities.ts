import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { TestDatabaseCommonValues } from "../../constants/TestDatabaseSeedValues";
import { NewCommunity } from "../schema/communities";
import { makeCommunityAdapter } from "../../infra/database/community";
import { makeCommunityAdminAdapter } from "../../infra/database/community-admin";
import { NewCommunityAdmin } from "../schema/communities-admins";

const communities: NewCommunity[] = [
    {
        uuid: TestDatabaseCommonValues.community1.uuid,
        name: "Test Community 1",
        latitude: 100,
        longitude: 100,
        isPrivate: false,
        description: "Description text",
    },
];

const communityAdmins: NewCommunityAdmin[] = [
    {
        uuid: TestDatabaseCommonValues.community1.admin1.uuid,
        userUuid: TestDatabaseCommonValues.community1.admin1.userUuid,
        communityUuid: TestDatabaseCommonValues.community1.admin1.communityUuid,
    },
];
export async function populate(db: NodePgDatabase) {
    const communityAdapter = makeCommunityAdapter(db);
    await communityAdapter.bulkCreate(communities);

    const communityAdminAdapter = makeCommunityAdminAdapter(db);
    await communityAdminAdapter.bulkCreate(communityAdmins);
}
