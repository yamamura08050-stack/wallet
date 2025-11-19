import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { styles } from '@/assets/styles/home.styles.js'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useTransactions } from '@/hooks/useTransactions';
import { useUser } from "@clerk/clerk-expo";
import { useDateRangeStore } from '@/hooks/useDateRangeStore';

const SummaryCard = () => {
    const { startDate, endDate, setStartDate, setEndDate } = useDateRangeStore();
    const [PickerVisible, setPickerVisible] = useState(false);
    const [selectingStart, setSelectingStart] = useState(true);
    const {user, isLoaded} = useUser();
    const { balance, fetchBalance, loadData} = useTransactions();

    const userId = user?.id;

    const showPicker = (isStart:boolean) => {
        setSelectingStart(isStart);
        setPickerVisible(true);
    };
   
    const hidePicker = () => setPickerVisible(false);

    const handleConfirm = (date:Date) => {
        hidePicker();
        if(selectingStart) {
            setStartDate(date);
            setTimeout(() => showPicker(false), 300);
        } else {
            setEndDate(date);

            fetchBalance({
             startDate: startDate ? startDate.toISOString().split("T")[0] : null,
             endDate: endDate ? endDate.toISOString().split("T")[0] : null,
                userId: userId,
             
            })
        }
    }

    const formatDate = (d:Date | null) => {
        if(!d) return "";
        const date = new Date(d);
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    };

    const displayText = 
        startDate && endDate
        ? `${formatDate(startDate)} - ${formatDate(endDate)}◀︎`
        : "This month◀︎";

  return (
    <View style={styles.summaryContainer}>

        {/*balanceCard*/}
        <View style={styles.balanceCard}>
            <Text style={styles.balanceText}>Balance</Text>
            {balance.balance >= 0 ? (
                <Text style={styles.balanceValue}
                    numberOfLines={1} 
                    ellipsizeMode="tail">+${balance.balance}</Text>
            ) : 
            <Text style={styles.balanceValue}
                    numberOfLines={1} 
                    ellipsizeMode="tail">-${balance.balance}</Text>}
            
            <TouchableOpacity onPress={() => showPicker(true)}>
                <Text style={styles.balanceOption}>{displayText}</Text>
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={PickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hidePicker}
            />
        </View>

        <View style={styles.summaryBottom}>

            {/*incomecard*/}
            <View style={styles.incomeCard}>
                <Text style={styles.incomeText}>Income</Text>
                <Text style={styles.incomeValue}
                        numberOfLines={1} 
                        ellipsizeMode="tail">+￥{balance.income}</Text>
            </View>

            {/*expensesCard*/}
            <View style={styles.expensesCard}>
                <Text style={styles.expensesText}>Expenses</Text>
                <Text style={styles.expensesValue}
                        numberOfLines={1} 
                        ellipsizeMode="tail">-￥{balance.expenses}</Text>
            </View>

        </View>

    </View>
  )
}

export default SummaryCard;