import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import { SignOutButton } from '../../components/SignOutButton'
import { styles } from '@/assets/styles/home.styles.js'
import SummaryCard from '@/components/SummaryCard'

export default function Page() {

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



    </View>
  )
};

