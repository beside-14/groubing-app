import { StyleSheet, Text, View } from "react-native";
import React, {useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextInput, Image } from "react-native";
import Counter from "react-native-counters";
import { Calendar } from "react-native-calendars";


export const Step1 = ({step1ToParent}) => {
    const [bingoTypeId, setBingoTypeId] = useState(0);

    const onPress = (id) => {
        setBingoTypeId(id);
        step1ToParent(bingoTypeId);
    };

    return (
        <View>
            <Text style={styles.title}>빙고 만들기</Text>
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
    );
};

const BingoType = (type) => {
    // console.log(type);
        function SelectType() {
            switch(type) {
                case 1: return '개인빙고 3×3 9칸'
                case 2: return '개인빙고 4×4 16칸'
                case 3: return '그룹빙고 3×3 9칸'
                case 4: return '그룹빙고 4×4 16칸'
        };
    };
        return (
        <View style={styles.prevStepContainer}>
            <Text style={styles.prevStepTitle}>빙고 타입</Text>
            <Text style={styles.prevStepContent}>
                <SelectType />
            </Text>
        </View>
        );
    };

const Disclosure = (p) => {
    function SelectOption() {
        const opt = p === 'public' ? '전체공개' : '비공개' ;
        return opt;
    };
    return (
        <View style={styles.prevStepContainer}>
            <Text style={styles.prevStepTitle}>빙고 공개 여부</Text>
            <Text style={styles.prevStepContent}>
                <SelectOption />
            </Text>
        </View>
    );
};

const BingoTitle = ({title}) => {
    return (
        <View style={styles.prevStepContainer}>
            <Text style={styles.prevStepTitle}>빙고 제목</Text>
            <Text style={styles.prevStepContent}>{title}</Text>
        </View>
    );
};

const Goal = ({goal}) => {
    return (
        <View style={styles.prevStepContainer}>
            <Text style={styles.prevStepTitle}>목표 빙고 개수</Text>
            <Text style={styles.prevStepContent}>{goal}</Text>
        </View>
    )
};

export const Step2 = ({step2ToParent, type}) => {
    // console.log(type);
    const [disclosure, setDisclosure] = useState('');
    const onPress = (str) => {
        setDisclosure(str);
        step2ToParent(disclosure);
    }

    return (
        <View style={styles.container}>
        <View>
            <Text style={styles.title}>빙고 만들기</Text>
            <Text style={styles.question}>빙고 공개 여부를 선택해주세요.</Text>
        </View>
        <View style={styles.gridBtn}>
            <TouchableOpacity 
                onPress={() => onPress('public') }
                style={disclosure === 'public' ? styles.selectedBtn : styles.unSelectedBtn}>
                <View >
                    <Text style={disclosure === 'public' ? styles.selectedBtnText : styles.unSelectedBtnText}>전체 공개</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => onPress('private')}
                style={disclosure === 'private' ? styles.selectedBtn : styles.unSelectedBtn}>
                <View>
                    <Text style={disclosure === 'private'? styles.selectedBtnText : styles.unSelectedBtnText}>비공개</Text>
                </View>
            </TouchableOpacity>
        </View>
        <BingoType
            type={type} 
        />
</View>
    );
    return disclosure;
};

export const Step3 = (type, disclosure) => {
    const [title, setTitle] = useState('');
    return (
        <View style={styles.container}>
        <View>
            <Text style={styles.title}>빙고 만들기</Text>
            <Text style={styles.question}>빙고 제목을 입력해주세요.</Text>
        </View>
        <View>
            <TextInput 
                onChangeText={(t) => setTitle(t)}
                value={title}
                style={{borderBottomWidth:1, fontSize:16, width: '100%', height:45, fontFamily:'NotoSansKR_400Regular'}}/>
        </View>
        <Disclosure disclosure={disclosure}/>
        <BingoType type={type}/>
        </View>
    )
};

export const Step4 = ({type, disclosure, title}) => {
    const [goal, setGoal] = useState(0);
    return (
        <View>
            <View>
            <Text style={styles.title}>빙고 만들기</Text>
            <Text style={styles.question}>목표 빙고 개수를 입력해주세요.</Text>
            </View>
            <View>
                <Counter 
                start={1} 
                min={1} 
                max={type === 3?8:10} 
                countTextStyle={{fontFamily:'NotoSansKR_400Regular', fontSize:14, color:"#000000"}}
                buttonTextStyle={{color:'#3A8ADB', fontSize:20}}
                buttonStyle={{backgroundColor:'#E7F0FA', borderRadius:99, width:30, height:30, borderColor:"#E7F0FA"}} />
            </View>
            <BingoTitle title={title}/>
            <Disclosure disclosure={disclosure} />
            <BingoType type={type} />
        </View>
    );
}

export const Step5 = ({type, disclosure, title, goal}) => {
    const [selected, setSelected] = useState('');

    return (
        <View>
            <View>
            <Text style={styles.title}>빙고 만들기</Text>
            <Text style={styles.question}>빙고 진행 기간을 입력해주세요.</Text>
            </View>
            <View style={{flexDirection:'row', borderBottomColor:'#DDDDDD', borderBottomWidth:1, paddingBottom:10 }}>
                <Text 
                style={{width:280, height:16, marginRight:15, marginLeft:2, fontSize:16}} >2023-03-12~2023-04-12</Text>
                <TouchableOpacity>
                    <Image source={require('../assets/icon_calendar.png')} />
                </TouchableOpacity>
            </View>
            {/* <Calendar /> */}
            <Goal goal={goal} />
            <BingoTitle title={title} />
            <Disclosure disclosure={disclosure} />
            <BingoType type={type} />
        </View>
    )
}

const styles= StyleSheet.create({
    container: {
        marginVertical:10
    },
    title: {
        fontFamily:'NotoSansKR_700Bold',
        width: '100%',
        height:40,
        fontSize:28,
        color:"#000000",
        marginBottom:30
    },
    question: {
        fontFamily: 'NotoSansKR_500Medium',
        width: '100%',
        height:26,
        fontSize:20,
        marginBottom:15
    },
    pContainer:{
        marginVertical:10,
    },
    pTitle: {
        fontFamily: 'NotoSansKR_500Medium',
        width:'100%',
        height:26,
        fontSize:16,
        marginBottom:4,
    },
    pContent: {
        fontFamily: 'NotoSansKR_400Regular',
        fontSize:13,
        width:'100%',
        height:17,
        color:"#666666"
    },
    gridBtn: {
        flexDirection:'row',
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
    prevStepContainer:  {
        marginTop : 15,
        marginBottom: 15
    },
    prevStepTitle : {
        width:'100%',
        height:20,
        fontFamily:'NotoSansKR_400Regular',
        fontSize:13,
        color:"#666666"
    },
    prevStepContent: {
        width:'100%',
        height:25,
        fontFamily:'NotoSansKR_500Medium',
        fontSize:18

    }
})