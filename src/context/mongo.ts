import { createContext } from "react";
import { App, User } from "realm-web";

type MongoClient = ReturnType<User["mongoClient"]>;
type MongoDatabase = ReturnType<MongoClient["db"]>;

export interface MongoContextType {
	user: User | null;
	db: MongoDatabase | null;
	app: App;
}

export const MongoContext = createContext<MongoContextType | null>(null);
