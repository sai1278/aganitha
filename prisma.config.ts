import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "binary", // necessary for Neon
  datasource: {
    url: "postgresql://neondb_owner:npg_xN1tDu8oLlcM@ep-solitary-sky-a18zrmts.ap-southeast-1.aws.neon.tech:5432/neondb?sslmode=require&channel_binding=require",
  },
});
