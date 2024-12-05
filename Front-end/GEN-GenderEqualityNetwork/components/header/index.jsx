import React, { useState } from 'react';
import { View, Text, StatusBar, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars'; // Importação do calendário
import Colours from '../../assets/colours';
import bell from "../../assets/images/bell.png";
import calendar from "../../assets/images/calendar.png";

export default function Header() {
    const [showCalendar, setShowCalendar] = useState(false); // Estado para exibir o calendário

    const handleBellPress = () => {
        alert('Bell clicado!');
    };  

    const handleCalendarPress = () => {
        setShowCalendar(!showCalendar); // Alterna a visibilidade do calendário
    };


    return (
        <View style={styles.container}>
            
            <StatusBar hidden={true} />

            <View>
                <Image
                    source={require('../../assets/images/profile.png')}
                    style={styles.pictureProfile}
                    resizeMode="contain"
                />
                <Text style={styles.projectName}>PROJETO VIVER BEM</Text>
            </View>

            <View>
                <Text style={styles.descriptionProject}>
                    O projeto viver bem fica localizado na rua salgadinho, 75 em Arthur Lundgren 2, Paulista e atua para amenizar os efeitos da desigualdade de gênero.
                </Text>
            </View>

            <View style={styles.iconContainer}>
                {/* Botão para Bell */}
                <TouchableOpacity onPress={handleBellPress} style={styles.touchable}>
                    <Image 
                        source={bell}
                        style={styles.bell}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleCalendarPress} style={styles.touchable}>
                    <Image 
                        source={calendar}
                        style={styles.calendar}
                        resizeMode="contain"
                        
                    />
                </TouchableOpacity>
            </View>

            {/* Exibe o calendário se showCalendar for true */}
            {showCalendar && (
             <View style={styles.calendarOverlay}>
             <Calendar
                 style={styles.containerCalendar}
                 onDayPress={(day) => {
                     alert(`Você selecionou ${day.dateString}`);
                 }}
                 markedDates={{
                     '2024-12-05': { selected: true, marked: true, selectedColor: 'blue' }, // Exemplo de data marcada
                 }}
             />
         </View>           
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colours.headerColour,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        width: '100%',
        padding: '30%',
        zIndex: 1,
    },
    pictureProfile: {
        position: 'absolute',
        width: '60%',
        top: -330,
        left: -90,
        zIndex: 2,
    },
    projectName: {
        width: '90%',
        fontSize: 25,
        fontWeight: 'bold',
        top: -55,
        left: 20,
        color: Colours.offWhite,
        position: 'absolute',
        zIndex: 1,
    },
    descriptionProject: {
        width: '150%',
        fontSize: 10,
        top: 40,
        left: -80,
        color: Colours.offWhite,
        position: 'absolute',
        zIndex: 1,
    },
    iconContainer: {
        flexDirection: 'column', 
        justifyContent: 'flex-end', 
        alignItems: 'center', 
        position: 'absolute',
        right: 20,
        top: 60,
    },
    touchable: {
        marginHorizontal: 10,
    },
    bell: {
        width: 30,
        height: 30,
        marginBottom: 100,
    },
    calendar: {
        width: 30,
        height: 30,
    },
    calendarOverlay:{
        position: 'absolute',
        margin: 65,
        padding: 10,
        marginTop: 180,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semitransparente
        borderRadius: 20, 
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10, // Certifica-se de que esteja sobreposto
    },
    containerCalendar: {
        width: '90%',
        borderRadius: 20,
        backgroundColor: '#fff',
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Sombra para Android
    }
});