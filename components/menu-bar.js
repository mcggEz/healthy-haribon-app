import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Menu } from "lucide-react-native";

export default function BurgerMenu() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        top: 0,
        left: 0,
      }}
      onPress={() => {
        navigation.navigate("Menu");
      }}
    >
      <Menu
        color="black"
        style={{
          marginTop: 40,
          marginLeft: 25,
        }}
      />
    </TouchableOpacity>
  );
}
