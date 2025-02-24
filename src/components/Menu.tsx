import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Share, Alert, Linking } from 'react-native';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { Ionicons } from '@expo/vector-icons';
import TextView from './TextView';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase/FirebaseConfig';
import { ROTA_LOGIN } from '../rotas/Rotas';

export default function MenuComponent({ }) {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation()
  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);


  function sobre() {
    navigation.navigate("ROTA_SOBRE")
    setVisible(false)
  }

  // const abrirLink = (link) => {
  //   const url = link; // Substitua pelo link desejado
  //   Linking.openURL(url).catch(err => console.error('Erro ao abrir o link:', err));
  // };

  //   async function compartilhar() {
  //     try {
  //       const result = await Share.share({
  //         message: TXT_COMPARTILHAR

  //       });
  //       if (result.action === Share.sharedAction) {
  //         if (result.activityType) {
  //           // shared with activity type of result.activityType
  //         } else {
  //           // shared
  //         }
  //       } else if (result.action === Share.dismissedAction) {
  //         // dismissed
  //       }
  //     } catch (error: any) {
  //       Alert.alert(error.message, "");
  //     }
  //   }

  //   async function avaliar() {
  //     Alert.alert(TXT_AVALIAR, "", [
  //       {
  //         text: "Sim, estou",

  //           onPress: () => Alert.alert(TXT_AVALIAR_LEGENDA, TXT_AVALIAR_TXT,
  //             [
  //               { text: "Avaliar", onPress: () => abrirLink("https://play.google.com/store/apps/details?id=com.anonymous.loteria") },
  //               { text: "Não" }

  //             ])
  //       },
  //   { text: "Não" },
  //     ])
  // }


  async function logout() {
    try {
      await auth.signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: ROTA_LOGIN as never }],
      });
      console.log("✅ Logout realizado com sucesso.");
    } catch (error) {
      console.error("❌ Erro ao fazer logout:", error.message);
    }
  }

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 2 }}>
      <Menu
        style={{ alignSelf: 'center' }}
        visible={visible}
        anchor={<Ionicons onPress={showMenu} style={{ alignSelf: 'center', color: "#000" }} size={30} name='ellipsis-vertical' />}
        onRequestClose={hideMenu}
      >


        {/* <MenuItem style={styles.temMenu} onPress={() => compartilhar()}><TextView value={"Compartilhar app"} /></MenuItem>
      <MenuItem style={styles.temMenu} onPress={() => avaliar()}><TextView value={"Avaliar app"} /></MenuItem> */}
        <MenuItem style={styles.temMenu} onPress={() => sobre()}><TextView value={"Sobre o app"} /></MenuItem>
        <MenuItem style={styles.temMenu} onPress={logout}><TextView value={"Logout"} /></MenuItem>
        <MenuDivider />
      </Menu>
    </View>
  );

}

const styles = StyleSheet.create({
  temMenu: {
    backgroundColor: "blue",
    borderWidth: 1
  },


})