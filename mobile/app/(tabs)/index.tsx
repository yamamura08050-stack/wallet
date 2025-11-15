import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link, router } from 'expo-router'
import { Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import { SignOutButton } from '../../components/SignOutButton'
import { styles } from '@/assets/styles/home.styles.js'
import SummaryCard from '@/components/SummaryCard'
import { useTransactions } from '@/hooks/useTransactions'
import { useEffect } from 'react'

export default function Page() {
  const { balance, fetchBalance, loadData} = useTransactions();

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <View style={styles.container}>

        {/*HEADER*/}
        <View style={styles.header}>
          <Text style={styles.headerText}>Home</Text>
          <SignOutButton />
        </View>

        {/*Summary*/}
        <SummaryCard/>

        <View style={styles.chartCard}>

        </View>

        <Text style={styles.transactionText}>Recent Transactions</Text>


        <View style={styles.transactionContainer}>
          
        </View>

          <TouchableOpacity 
            style={styles.createBtn} 
            onPress={() => router.push("/create")}
          >
            <Text style={styles.createBtnText}>Create</Text>
          </TouchableOpacity>
       



    </View>
  )
};

