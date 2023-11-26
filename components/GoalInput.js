
import { React, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Pressable,
} from 'react-native';

export default function GoalInput() {

    const [inputText, setInputText] = useState("");
    const [courseGoals, setCourseGoals] = useState([]);
    const inputTextHandler = (inputText) => {
        setInputText(inputText);
    };
    const handlePress = () => {
        // console.log('Do not click this button again!!');
        // Alert.alert('Do not click this button again!!');
        setCourseGoals((currentCourseGoals) => [...currentCourseGoals, inputText]);
        console.log(courseGoals);
    };
    return (
        <View>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type here.."
                    onChangeText={inputTextHandler}
                />
                <Pressable
                    style={styles.btn}
                    title="Click here.."
                    onPress={handlePress}
                >
                    <Text>Click here..</Text>
                </Pressable>
            </View>
            <View>
                {courseGoals.map((goal, i) => (
                    <View key={i} style={styles.goalView}>
                        <Text style={styles.goal}>
                            {i + 1}. {goal}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row",
        // flex: 1
    },
    container: {
        flexDirection: "row",
        flex: 1,
    },
    input: {
        borderWidth: 1,
        borderColor: "red",
        height: 40,
        flex: 1,
        margin: 5,
        padding: 5,
    },
    btn: {
        margin: 5,
        padding: 5,
        margin: 5,
    },
    goal: {
        margin: 2,
        padding: 10,
        fontWeight: "bold",
        color: "#ffff",
    },
    goalView: {
        borderWidth: 1,
        borderColor: "blue",
        backgroundColor: "green",
        marginBottom: 2,
    },
})