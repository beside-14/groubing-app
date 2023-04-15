import { StyleSheet, Text, SafeAreaView, ScrollView, View } from "react-native";
import React, {useState } from "react";
import { ProgressBar } from "react-native-paper";
import { ProgressStep, ProgressSteps } from "@dduyon2/react-native-progress-steps";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Step1, Step2, Step3, Step4, Step5 } from "../../utils/CreatingStepUtil";

const CreateBingo = () => {
    const [bingoType, setBingoType] = useState(0);
    const [disclosure, setDisclosure] = useState('');
    const [bingoTitle, setBingoTitle] = useState('');
    const [goal, setGoal] = useState(1);
    const [startDate, SetStartDate] = useState('');

    const step1ToParent = (bingotype) => {
        // console.log(bingotype);
        setBingoType(bingotype); 
        // console.log(bingoType);
    }

    const step2ToParent = (dc) => {
        setDisclosure(dc);
    }

    const step3ToParent = (title) => {
        setBingoTitle(title);
    }

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
    //$ npm install git+https://github.com/dduyon2/react-native-progress-steps.git
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
                        <Step1 step1ToParent={step1ToParent} />
                    </ProgressStep>
                    <ProgressStep 
                        nextBtnStyle={nextBtnStyle} nextBtynTextStyle={nextBtnText} nextBtnText="다음" >
                        <Step2 step2ToParent={{step2ToParent, bingoType}}/>
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
                        <Step4 />
                    </ProgressStep>
                    <ProgressStep 
                        nextBtnStyle={nextBtnStyle}
                        nextBtnTextStyle={nextBtnText}
                        finishBtnText="빙고 생성">
                        <Step5 />
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