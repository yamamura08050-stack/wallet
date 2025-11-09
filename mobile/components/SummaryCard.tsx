import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '@/assets/styles/home.styles.js'

const SummaryCard = () => {
  return (
    <View style={styles.summaryContainer}>

        {/*balanceCard*/}
        <View style={styles.balanceCard}>
            <Text style={styles.balanceText}>Balance</Text>
            <Text style={styles.balanceValue}
                    numberOfLines={1} 
                    ellipsizeMode="tail">+￥10,000</Text>
            <Text style={styles.balanceOption}>This month◀︎</Text>
        </View>

        <View style={styles.summaryBottom}>

            {/*incomecard*/}
            <View style={styles.incomeCard}>
                <Text style={styles.incomeText}>Income</Text>
                <Text style={styles.incomeValue}
                        numberOfLines={1} 
                        ellipsizeMode="tail">+￥10,000</Text>
            </View>

            {/*expensesCard*/}
            <View style={styles.expensesCard}>
                <Text style={styles.expensesText}>Expenses</Text>
                <Text style={styles.expensesValue}
                        numberOfLines={1} 
                        ellipsizeMode="tail">-￥10,000</Text>
            </View>

        </View>

    </View>
  )
}

export default SummaryCard;