import { StyleSheet, Text, SafeAreaView, ScrollView, View, TextInput,Image} from "react-native";
import React, {useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import StepBar from "../../components/StepBar";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const CreateBingo = () => {
    const [bingoTypeId, setBingoTypeId] = useState(0);
    const [bingoType, setBingoType] = useState('');
    const [disclosure, setDisclosure] = useState('');
    const [bingoTitle, setBingoTitle] = useState('');
    const [goal, setGoal] = useState(1);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState();
    const [visible, setVisible] = useState(false);
    const [nowStep, setNowStep] = useState(1);
    

    const [showBingoType, setShowBingoType] = useState(true);
    const [showBingoPublic, setShowBingoPublic] = useState(false);
    const [showBingoTitle, setShowBingoTitle] = useState(false);
    const [showGoal, setShowGoal] = useState(false);
    const [showBingoPeriod, setShowBingoPeriod] = useState(false);
    
    var bingoJson = [];

    const onIncrease = () => {
        setGoal(prevNumber => prevNumber +1);
    }
    const onDecrease = () => {
        setGoal(prevNumber => prevNumber -1);
    }
    const openCalendar = () => {
        setVisible(true);
    }
    const onConfirm = (date) => {
        console.warn("A date has been picked : ", date);
        onCancel();
    }
    const onCancel= () => { setVisible(false); }

    function selectType(type) { 
        switch(type) {
            case 1: return '개인빙고 3×3 9칸'
            case 2: return '개인빙고 4×4 16칸'
            case 3: return '그룹빙고 3×3 9칸'
            case 4: return '그룹빙고 4×4 16칸'
        };
    }
    const onPress = (id) => { setBingoTypeId(id); } 
    const onPressPublic = (p) => { setDisclosure(p); }
    const setbingoTp = (id) => {
        const type = selectType(id);
        setBingoType(type);
    }
    const makeBingoData = () => {
        const bingoJson = {
            title : bingoTitle,
            goal: goal,
            bingoSize: bingoType,
            open: disclosure,
            since: new Date(),
            untile: new Date()+1,
        }
        console.log(bingoJson);
        return bingoJson;
    }

    const BINGOTYPE = () => {
        return(
            <View style={styles.summaryContainer}>
                <Text style={styles.pContent}>빙고 타입</Text>
                <Text style={styles.pTitle}>{bingoType}</Text>
            </View>
        )
    }
    const BINGOPUBLIC = () => {
        return (
            <View style={styles.summaryContainer}>
                <Text style={styles.pContent}>빙고 공개 여부</Text>
                <Text style={styles.pTitle}>{disclosure}</Text>
            </View>
        )
    }
    const BINGOTITLE = () => {
        return (
            <View style={styles.summaryContainer}>
                <Text style={styles.pContent}>빙고 제목</Text>
                <Text style={styles.pTitle}>{bingoTitle}</Text>
            </View>
        )
    }
    const BINGOGOAL = () => {
        return (
            <View style={styles.summaryContainer}>
                <Text style={styles.pContent}>목표 빙고 개수</Text>
                <Text style={styles.pTitle}>{goal}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <ScrollView style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.stepBarContainer}>
                        <StepBar step={5} now={nowStep} />
                    </View>
                </View>
                <View style={styles.bodyContainer}>
                    {showBingoType && (
                    <View>
                        <Text style={styles.question}>빙고 타입을 선택해주세요.</Text>
                        <View style={styles.pContainer}>
                            <View style={{marginRight: 16}}>
                                <Text style={styles.pTitle}>개인 빙고</Text>
                                <Text style={styles.pContent}>나만의 빙고를 만들어요.</Text>
                            </View>
                            <View style={styles.gridBtn}>
                                <TouchableOpacity 
                                    onPress={() => onPress(1)}
                                    style={bingoTypeId === 1? styles.selectedBtn : styles.unSelectedBtn}>
                                    <View >
                                        <Text style={bingoTypeId === 1? styles.selectedBtnText : styles.unSelectedBtnText}>3×3 9칸</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => onPress(2)}
                                    style={bingoTypeId === 2? styles.selectedBtn : styles.unSelectedBtn}>
                                    <View>
                                        <Text style={bingoTypeId === 2? styles.selectedBtnText : styles.unSelectedBtnText}>4×4 16칸</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.divisionLine} />
                        <View style={styles.pContainer} >
                            <View style={{marginRight: 16}}>
                                <Text style={styles.pTitle}>그룹 빙고</Text>
                                <Text style={styles.pContent}>친구들과 빙고를 함께 해요.</Text>
                            </View>
                            <View style={styles.gridBtn}>
                                <TouchableOpacity
                                    onPress={() => onPress(3)}
                                    style={bingoTypeId === 3? styles.selectedBtn : styles.unSelectedBtn}>
                                    <View>
                                        <Text style={bingoTypeId === 3? styles.selectedBtnText : styles.unSelectedBtnText}>3×3 9칸</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => onPress(4)}
                                    style={bingoTypeId === 4? styles.selectedBtn : styles.unSelectedBtn}>
                                    <View>
                                        <Text 
                                            onPress={() => onPress(4)}
                                            style={bingoTypeId === 4? styles.selectedBtnText : styles.unSelectedBtnText}>4×4 16칸</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    )}

                    {showBingoPublic && (
                        <View>
                           <Text style={styles.question}>빙고 공개 여부를 선택해주세요.</Text>
                           <View style={styles.gridBtn}>
                                <TouchableOpacity 
                                    onPress={() => onPressPublic('public') }
                                    style={disclosure === 'public' ? styles.selectedBtn : styles.unSelectedBtn}>
                                    <View >
                                        <Text style={disclosure === 'public' ? styles.selectedBtnText : styles.unSelectedBtnText}>전체 공개</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => onPressPublic('private')}
                                    style={disclosure === 'private' ? styles.selectedBtn : styles.unSelectedBtn}>
                                    <View>
                                        <Text style={disclosure === 'private'? styles.selectedBtnText : styles.unSelectedBtnText}>비공개</Text>
                                    </View>
                                </TouchableOpacity>         
                            </View>
                            <BINGOTYPE />
                        </View>
                    )}

                    {showBingoTitle && (
                        <View>
                            <Text style={styles.question}>빙고 제목을 입력해주세요.</Text>
                            <View>
                                <TextInput 
                                    onChangeText={(t) => setBingoTitle(t)}
                                    value={bingoTitle}
                                    style={{borderBottomWidth:1, fontSize:16, width: '100%', height:45, fontFamily:'NotoSansKR_400Regular'}}/>
                            </View>
                            <BINGOPUBLIC />
                            <BINGOTYPE />
                        </View>
                    )}
                    {showGoal && (
                        <View>
                            <Text style={styles.question}>목표 빙고 개수를 입력해주세요.</Text>
                            <View style={styles.counterContainer}>
                                <TouchableOpacity
                                    onPress={onDecrease}
                                    style={styles.counterBtn}>
                                        <Text style={styles.counterBtnTxt}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.countText}>{goal}</Text>
                                <TouchableOpacity
                                    onPress={onIncrease}
                                    style={styles.counterBtn}>
                                        <Text style={styles.counterBtnTxt}>+</Text>
                                </TouchableOpacity>
                            </View>                                
                            <BINGOTITLE />
                            <BINGOPUBLIC />
                            <BINGOTYPE />
                        </View>
                    )}
                    
                    {showBingoPeriod && (
                        <View>
                            <Text style={styles.question}>빙고 진행 기간을 입력해주세요.</Text>
                            <View style={{flexDirection:'row', borderBottomColor:'#DDDDDD', borderBottomWidth:1, paddingBottom:10 }}>
                                <Text 
                                    style={{width:280, height:16, marginRight:15, marginLeft:2, fontSize:16}} >2023-03-12~2023-04-12</Text>
                                <TouchableOpacity onPress={openCalendar}>
                                    <Image source={require('../../assets/icon_calendar.png')} />
                                </TouchableOpacity>
                            </View>
                            <DateTimePickerModal 
                                isVisible={visible}
                                mode='date'
                                onConfirm={onConfirm}
                                onCancel={onCancel}
                                />
                            <BINGOGOAL />
                            <BINGOTITLE />
                            <BINGOPUBLIC />
                            <BINGOTYPE />
                        </View>
                    )}
                    </View>
                <View style={styles.nextBtnContainer}>
                    {showBingoType && (
                    <TouchableOpacity
                        style={styles.nextBtn}
                        onPress={() => {
                            setNowStep(nowStep + 1);
                            setShowBingoType(false);
                            setShowBingoPublic(true);
                            setbingoTp(bingoTypeId);
                            }} >
                        <Text style={styles.nextBtnTxt}>다음</Text>
                    </TouchableOpacity>
                    )}
                    {showBingoPublic && (
                    <TouchableOpacity
                        style={styles.nextBtn}
                        onPress={() => {
                            setNowStep(nowStep + 1);
                            setShowBingoTitle(true);
                            setShowBingoPublic(false);
                            }} >
                        <Text style={styles.nextBtnTxt}>다음</Text>
                    </TouchableOpacity>
                    )}
                    {showBingoTitle && (
                    <TouchableOpacity
                        style={styles.nextBtn}
                        onPress={() => {
                            setNowStep(nowStep + 1);
                            setShowBingoTitle(false);
                            setShowGoal(true);
                            }} >
                        <Text style={styles.nextBtnTxt}>다음</Text>
                    </TouchableOpacity>
                    )}
                    {showGoal && (
                    <View style={styles.gridBtn}>
                    <TouchableOpacity
                        style={styles.tempBtn}
                        onPress={() => {
                            }} >
                        <Text style={styles.tempBtnText}>임시저장</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.nextBtn2}
                        onPress={() => {
                            setNowStep(nowStep + 1);
                            setShowGoal(false);
                            setShowBingoPeriod(true);
                            }} >
                        <Text style={styles.nextBtnTxt}>다음</Text>
                    </TouchableOpacity>
                    </View>
                    )}
                    {showBingoPeriod && (
                    <TouchableOpacity
                        style={styles.nextBtn}
                        onPress={() => {
                            setNowStep(nowStep + 1);
                            setShowBingoPeriod(false);
                            makeBingoData();
                            }} >
                        <Text style={styles.nextBtnTxt}>빙고생성</Text>
                    </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer : {
        backgroundColor:'#FFFFFF', 
        height:'100%',
        flex: 1,
    },
    container: {
        marginHorizontal:25,
        flex: 1,
        height: "100%",
    },
    headerContainer: {
        height: "15%",
        marginHorizontal: 12,
        marginBottom: 20,
    },
    bodyContainer: {
        flex: 1,
        position: "relative",
        justifyContent:"space-between",

    },
    question: {
        fontFamily: 'NotoSansKR_700Bold',
        width: '100%',
        height:36,
        fontSize:24,
        marginBottom:10
    },
    pContainer:{
        marginVertical:10,
    },
    pTitle: {
        fontFamily: 'NotoSansKR_500Medium',
        width:'100%',
        height:26,
        fontSize:16,
        marginVertical:4,
    },
    pContent: {
        fontFamily: 'NotoSansKR_400Regular',
        fontSize:13,
        width:'100%',
        height:17,
        color:"#666666",
        marginVertical:4,
    },
    gridBtn: {
        flexDirection:'row',
        width:'100%'
    },
    unSelectedBtnText: {
        width: '100%',
        height:16,
        fontSize:15,
        color:'#666666',
    },
    unSelectedBtn: {
        backgroundColor:"#F3F3F3",
        width: 89,
        height:45,
        borderRadius:99,
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
        marginRight:6
    },
    selectedBtnText: {
        width: '100%',
        height:16,
        fontSize:15,
        color:'#FFFFFF'
    },
    selectedBtn: {
        backgroundColor:"#3A8ADB",
        width: 89,
        height:45,
        borderRadius:99,
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
        marginRight:6
    },
    divisionLine:{
        borderWidth:0.5,
        borderColor:'#EFEFEF',
        margin: 10,
    },
    nextBtnContainer: {
        width: "100%",
        marginBottom: 13,
    },
    nextBtn: {
        height: 48,
        backgroundColor: "#000000",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
    },
    nextBtn2: {
        height: 48,
        backgroundColor: "#000000",
        width: 214,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
    },
    tempBtn: {
        width:100,
        height:48,
        justifyContent:"center",
        alignItems:"center",
        paddingVertical:14,
        paddingHorizontal:12,
        borderRadius: 4,
        backgroundColor:"#FFFFFF",
        borderColor:"#DDDDDD",
        borderWidth:1,
        marginRight: 6,
    },
    tempBtnText: {
        fontFamily: 'NotoSansKR_500Medium',
        width:'100%',
        fontSize: 14,
        color:"#000000",
        textAlign:"center",
    },
    nextBtnTxt: {
        fontSize: 14,
        fontFamily: "NotoSansKR_500Medium",
        color: "#FFFFFF",
    },
    summaryContainer : {
        width:"100%",
        marginVertical: 10,
    },
    stepBarContainer: {
        marginTop: 26,
        width: 150,
    },
    counterContainer: {
        flexDirection:'row',
    },
    counterBtn: {
        backgroundColor:"#E7F0FA",
        height:40,
        width:40,
        borderRadius:99,
        justifyContent:'center',
        alignItems:'center',
    },
    counterBtnTxt: {
        color:"#3A8ADB",
        fontSize:22
    },
    countText: {
        fontFamily:"NotoSansKR_500Medium",
        fontSize:16,
        marginHorizontal:12,
        alignItems:'center',
        justifyContent:'center',
    }


});
export default CreateBingo;