import { useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const startAddGoalHandler = () => {
    setModalIsVisible(true);
  };

  const endGoalHandler = () => {
    setModalIsVisible(false);
  };

  function addGoalHandler(enteredGoalText) {
    setCourseGoals((curCourseGoals) => [
      ...curCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    endGoalHandler();
  }

  function deleteGoalHandler(id) {
    setCourseGoals((curCourseGoals) => {
      return curCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color="#a065ec"
          onPress={startAddGoalHandler}
        />
        <GoalInput
          onAddGoal={addGoalHandler}
          onCancel={endGoalHandler}
          visible={modalIsVisible}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => (
              <GoalItem
                text={itemData.item.text}
                id={itemData.item.id}
                onDeleteItem={deleteGoalHandler}
              />
            )}
            keyExtractor={(item, index) => item.id}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1,
  },

  goalsContainer: {
    flex: 5,
  },
});
