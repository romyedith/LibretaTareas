import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { CheckBox } from 'react-native-elements'
import { updateDoc, doc } from "firebase/firestore";
import { database } from "../config/firestore";

export default function Updatefirestore({ route, navigation }) {
	const { item } = route.params;
	//const [terminada, setTerminada]=useState(false);
	const id = item.id;
	const [newItem, setNewItem] = useState({
		tarea: item.tarea,
		materia: item.materia,
		fechaentrega: item.fechaentrega,
		fechaasignacion: item.fechaasignacion,
		updatedAt: new Date(),
		terminada:item.terminada
	});

	const onUpdate = async () => {
		try {
			await updateDoc(doc(database, "cruds", id), newItem);
			alert("Actualización exitosa");
		} catch (error) {
			alert("Error al actualizar");
		}
		navigation.navigate("Home", {
			data: item,
		});
	};

	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				<Text style={styles.textHeader}>Actualizar tarea</Text>
				<TextInput
					multiline={true}
					onChangeText={(text) => setNewItem({ ...newItem, tarea: text })}
					defaultValue={item.tarea}
					placeholder="Descripción tarea"
					style={styles.textInput}
				></TextInput>
				<TextInput
					multiline={false}
					onChangeText={(text) => setNewItem({ ...newItem, materia: text })}
					defaultValue={item.materia}
					placeholder="Nombre materia"
					style={styles.textInput}
				></TextInput>
				<TextInput
					style={styles.textInput}
					multiline={false}
					onChangeText={(text) => setNewItem({ ...newItem, fechaasignacion: text })}
					defaultValue={item.fechaasignacion}
					placeholder="Fecha asignación"
				></TextInput>
				<TextInput
					style={styles.textInput}
					multiline={false}
					onChangeText={(text) => setNewItem({ ...newItem, fechaentrega: text })}
					defaultValue={item.fechaentrega}
					placeholder="Fecha entrega"
				></TextInput>
				<CheckBox
					center
					title='Terminada'
					checked={item.terminada}
					onPress={(checked) => setNewItem({...newItem, terminada: checked})}
				/>
				<Button title="Actualizar" onPress={onUpdate} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#dfedfa",
	},
	innerContainer: {
		padding: 15,
		margin: 15,
		borderRadius: 15,
		alignItems: "center",
		backgroundColor: "#fff",
		elevation: 10,
	},
	textHeader: {
		fontWeight: "bold",
		padding: 20,
	},
	textInput: {
		width: "90%",
		padding: 10,
		marginVertical: 6,
		borderWidth: 1,
		borderRadius: 6,
		borderColor: "red",
	},
	checkbox: {
		alignSelf: 'center',
	  },
});
