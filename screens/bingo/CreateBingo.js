import { StyleSheet, Text, SafeAreaView, ScrollView, View } from "react-native";
import React, {useState } from "react";
import { ProgressBar } from "react-native-paper";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Step1, Step2, Step3 } from "../../utils/CreatingStepUtil";

const CreateBingo = () => {

    const progressStyle = {
        activeStepIconBorderColor:"#CFF3DD",
        progressBarColor:"#DDDDDD",
        disabledStepIconColor:"#DDDDDD",
        activeStepIconColor:"#11C656",
        activeStepNumColor:"#11C656",
        disabledStepNumColor:"#DDDDDD",
        marginBottom:20,
        completedStepIconColor:"#11C656",
        activeLabelFontSize:2,
        completedCheckColor:"#11C656",
        borderWidth:1
    };

    const nextBtnStyle= {
        width:325,
        height:50,
        backgroundColor:"#000000",
        alignItems:"center",
        marginBottom:20,
        borderRadius:4,
        justifyContent:'center'       
    };
    const nextBtnStyle1= {
        width:210,
        height:50,
        backgroundColor:"#000000",
        alignItems:"center",
        marginBottom:20,
        borderRadius:4,
        justifyContent:'center'       
    };
    const prevBtnStyle= {
        width:100,
        height:50,
        backgroundColor:"#FFFFFF",
        alignItems:"center",
        marginBottom:20,
        borderRadius:4,
        justifyContent:'center',
        borderColor:'#DDDDDD',
        borderStyle:'solid',  
        borderWidth:1,
    };
    
    const prevBtnText = {
        fontFamily:'NotoSansKR_500Medium',
        width: 65,
        height: 25,
        fontSize:16,
        color:'#000000',
        fontWeight: 'bold'
    };

    const nextBtnText = {
        fontFamily:'NotoSansKR_500Medium',
        width:70,
        height: 25,
        fontSize:16,
        color:'#FFFFFF',
        fontWeight: 'bold'
    }

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <ScrollView style={styles.container}>
                <ProgressSteps {...progressStyle} style={styles.progress}>
                    <ProgressStep nextBtnStyle={nextBtnStyle} nextBtynTextStyle={nextBtnText} nextBtnText="다음">
                        <Step1 />
                    </ProgressStep>
                    <ProgressStep 
                        nextBtnStyle={nextBtnStyle} nextBtynTextStyle={nextBtnText} nextBtnText="다음" >
                        <Step2 />
                    </ProgressStep>
                    <ProgressStep                         
                        nextBtnStyle={nextBtnStyle} nextBtynTextStyle={nextBtnText} nextBtnText="다음" >
                        <Step3 />
                    </ProgressStep>
                    <ProgressStep 
                        nextBtnStyle={nextBtnStyle1} 
                        nextBtynTextStyle={nextBtnText}
                        nextBtnText="다음"
                        previousBtnText="임시 저장"
                        previousBtnStyle={prevBtnStyle}
                        previousBtnTextStyle={prevBtnText} >

                        <View>
                            <Text>This is the content within step 4!</Text>
                        </View>
                    </ProgressStep>
                    <ProgressStep 
                        nextBtnStyle={nextBtnStyle}
                        nextBtnTextStyle={nextBtnText}
                        finishBtnText="빙고 생성">
                        <View>
                            <Text>This is the content within step 5!</Text>
                        </View>
                    </ProgressStep>
                </ProgressSteps>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer : {
        backgroundColor:'#FFFFFF', 
        height:'100%',
    },
    container: {
        marginHorizontal:25,
    },
    bottom: {
    },
 
});
export default CreateBingo;