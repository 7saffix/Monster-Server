import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const envConfig = {
  port: process.env.PORT,
  db_url: process.env.MONGO_URL as string,
  access_secret: process.env.ACCESS_SECRET as string,
  access_expires_in: process.env.ACCESS_EXPIRES_IN,
};

export default envConfig;
