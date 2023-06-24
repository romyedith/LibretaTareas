import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	Pressable,
	Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {Header} from "react-native-elements";

import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { database } from "../config/firestore";

export default function Listfirestore() {
	const navigation = useNavigation();
	const [cruds, setCruds] = useState([]);

	// Using Firestore
	useEffect(() => {
		const dbRef = collection(database, "cruds");

		const q = query(dbRef, orderBy("fechaentrega", "asc"));

		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			setCruds(
				querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			);
		});

		return unsubscribe;
	}, []);

	const getTaskBackgroundColor = (terminada) => {
		return terminada ? "#8BC34A" : "#F44336"; // Verde si está terminada, rojo si no lo está
	};

	return (
		<View style={styles.container}>
			<View>
				<Header
					centerComponent={{text:"Libreta de tareas", 
									  style:{color:"#0E3FF4",
									  fontSize:30,
									  fontWeight:"bold"}}}
					containerStyle={{backgroundColor: "#0EF4DF"}}
				></Header>
				<Button
					title="Agregar tarea"
					onPress={() => navigation.navigate("Addfirestore")}
				/>
				<Text style={styles.textTitle}>Listado</Text>
				<FlatList
					style={{ height: "100%" }}
					data={cruds}
					numColumns={1}
					renderItem={({ item }) => (
						<Pressable
							onPress={() =>
								navigation.navigate("Detailsfirestore", {
									data: item,
								})
							}
							style={({ pressed }) => [
								styles.button,
								{
									backgroundColor: pressed ? "#dfedfa" : getTaskBackgroundColor(item.terminada),
									opacity: pressed ? 0.5 : 1,
									margin: 10,
									padding: 15,
									borderRadius: 12,
									alignItems: "center",
									elevation: 5,
								},
							]}
						>
							<View style={styles.innerContainer}>
								<Text style={styles.textHeader}>{item.tarea}</Text>
								<Text style={styles.about}>{item.materia}</Text>
							</View>
						</Pressable>
					)}
					keyExtractor={(item) => item.id}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#dfedfa",
	},
	innerContainer: {
		flexDirection: "column",
		alignItems: "center",
	},
	textTitle: {
		marginLeft: 190,
		marginTop: 20,
		fontWeight: "bold",
		fontSize: 20,
	},
	textHeader: {
		fontWeight: "bold",
	},
	about: {
		fontWeight: "300",
	},
});
