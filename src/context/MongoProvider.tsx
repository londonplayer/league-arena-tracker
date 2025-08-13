import { useState, useEffect, type ReactNode } from "react";
import { App, Credentials, User } from "realm-web";
import { MongoContext } from "./mongo";

const APP_ID = "league-arena-tracker-mcklqcw";
const app = new App({ id: APP_ID });

type MongoClient = ReturnType<User["mongoClient"]>;
type MongoDatabase = ReturnType<MongoClient["db"]>;

interface MongoProviderProps {
	children: ReactNode;
}

const MongoProvider = ({ children }: MongoProviderProps) => {
	const [user, setUser] = useState<User | null>(null);
	const [db, setDb] = useState<MongoDatabase | null>(null);

	useEffect(() => {
		const loginAnonymous = async () => {
			if (!app.currentUser) {
				const anonymousUser = await app.logIn(Credentials.anonymous());
				setUser(anonymousUser);
			} else {
				setUser(app.currentUser);
			}
		};
		loginAnonymous();
	}, []);

	useEffect(() => {
		if (user) {
			const mongodb = user.mongoClient("mongodb-atlas");
			const dbConnection = mongodb.db("league-tracker");
			setDb(dbConnection);
		}
	}, [user]);

	return <MongoContext.Provider value={{ user, db, app }}>{children}</MongoContext.Provider>;
};

export default MongoProvider;
