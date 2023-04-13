import { View, StyleSheet, Text } from "react-native";
import { countBingos, generateBingoBoard } from "../utils/BingoUtil";
import BingoBoard from "./BingoBoard";
//import { Image } from "react-native";

export default function BoardList({ item }) {
  const bingo = generateBingoBoard(item.size, []);
  const bingoCount = countBingos(bingo, item.size);
  return (
    <View style={styles.container}>
      <View style={styles.listTextContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.type}>{item.type}</Text>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.perieod}>
            {item.start} ~ {item.end}
          </Text>
          <Text style={styles.goal}>
            {item.complete}/{item.goal}빙고
          </Text>
        </View>
      </View>
      <View style={styles.bingoContainer}>
        <BingoBoard
        size={item.size}
        onToggle={null} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginTop: 20,
    marginRight: 10,
    flexDirection: "row",
  },
  bingoContainer: {
    width: 50,
    height: 50,
  },
  titleContainer: {
    flexDirection: "row",
  },
  listTextContainer: {
    width: 260,
    height: 60,
  },
  title: {
    fontFamily: "NotoSansKR_500Medium",
    fontSize: 15,
    width: 224,
    height: 20,
    marginBottom: 4,
  },
  type: {
    fontFamily: "NotoSansKR_500Medium",
    fontSize: 15,
    width: 28,
    height: 20,
    color: "#3A8ADB",
    marginRight: 4,
    marginBottom: 4,
  },
  perieod: {
    fontFamily: "NotoSansKR_400Regular",
    fontSize: 13,
    width: 165,
    height: 17,
    color: "#666666",
  },
  goal: {
    fontFamily: "NotoSansKR_400Regular",
    fontSize: 13,
    width: 43,
    height: 17,
    color: "#666666",
  },
});
