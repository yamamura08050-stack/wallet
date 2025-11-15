import { View, Text, KeyboardAvoidingView, TouchableOpacity, ScrollView, TextInput, FlatList } from 'react-native'
import React, { useState } from 'react'
import { styles } from "../../assets/styles/create.styles.js"
import { router,} from 'expo-router'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useUser } from '@clerk/clerk-expo'
import { Try } from 'expo-router/build/views/Try'

const Create = () => {
    const {user} = useUser();
    const userId = user?.id;

    const [type, setType] = useState<"income" | "expenses" | null>(null);
    const [amount, setAmount] = useState("");
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [isFocusedCategory, setIsFocusedCategory] = useState(false);
    const [isFocusedPayment, setIsFocusedPayment] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [category, setCategory] = useState("");
    const [paymentMethodHistory, setPaymentMethodHistory] = useState([
        "cash",
        "Apple Pay",
        "credit card",
        
    ]);
    const [categoryHistory, setCategoryHistory] = useState([
        "Food",
        "Shopping",
        "Travel",
        "fdfdfd",
        "fdfdfd",
        "eerere"
    ]);

    const createCategory = async () => {
        if(!category || !userId) return;

        try {
            const res = await fetch("http://localhost:5001/api/transactions/categories",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    category: category,
                    userId: userId,
                }),
            });

            const data = await res.json();

            if(!res.ok) {
                console.log("Error creating category:", data);
                return;
            }

            console.log("Category created:", data);

            setCategory("");

            setCategoryHistory((prev) => {
                if(prev.includes(data.name)) return prev;
                return [...prev, data.name]
            });
        } catch (error) {
            console.log("Error creating Category:", error);
        }
    };
    
    const createPaymentMethod = async () => {
        if(!paymentMethod || !userId) return;

        try {
            const res = await fetch("http://localhost:5001/api/transactions/payment-method", {
                method: "POST",
                headers: {
                    "Content-Type": "Japplication/json",
                },
                body: JSON.stringify({
                    paymentMethod: paymentMethod,
                    userId: userId,
                }),
            });

            const data = await res.json();

            if(!res.ok) {
                console.log("Error creating paymentMethod:", data);
                return;
            };
            console.log("PaymentMethod created:", data );

            setPaymentMethod("");

            setPaymentMethodHistory((prev) => {
                if(prev.includes(data.name)) return prev;
                    return [...prev, data.name]
                });
        } catch (error) {
            console.log("Error creating paymentMethod:", error);
        }
    };

    const handleCreateTransaction = () => {
        return;
    };


  return (
    <KeyboardAvoidingView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
    >
        <View style={styles.container}>

            {/*header*/}
            <View style={styles.headerContainer}>

                <Text style={styles.headerLeft}>New Transaction</Text>

                <TouchableOpacity 
                    style={styles.headerRight}
                    onPress={() => router.back()}
                >
                    <Text style={styles.headerRightText}>back</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.typeBtnContainer}>
                <TouchableOpacity 
                    onPress={() => setType(type === "income" ? null : "income")}
                    style={[
                        styles.incomeBtn,
                        type === "income" && styles.activeIncomeBtn
                    ]}       
                >
                    <Text style={styles.incomeBtnText}>Income</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => setType(type === "expenses" ? null : "expenses")}
                    style={[
                        styles.expensesBtn,
                        type === "expenses" && styles.activeExpensesBtn]}> 
                    <Text style={styles.expensesBtnText}>Expenses</Text>
                </TouchableOpacity>
            </View>


            <ScrollView
                style={styles.formContainer}
                contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Title</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        value={title}
                        placeholder="Enter the title"
                        placeholderTextColor="#cbc8c8"
                        onChangeText={(title) => setTitle(title)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Amount</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        value={amount}
                        placeholder="Enter the amount"
                        placeholderTextColor="#cbc8c8"
                        onChangeText={(amount) => setAmount(amount)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Location</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        value={location}
                        placeholder="Enter the location"
                        placeholderTextColor="#cbc8c8"
                        onChangeText={(location) => setLocation(location)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Category</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        value={category}
                        placeholder="Enter the Category"
                        placeholderTextColor="#cbc8c8"
                        onChangeText={(Category) => setCategory(Category)}
                        onFocus={() => setIsFocusedCategory(true)}
                        onBlur={() => setIsFocusedCategory(false)}
                    />

                    {isFocusedCategory && (
                        <View style={{ maxHeight: 110, width: '100%' }}>
                            <FlatList
                                data={categoryHistory.filter((item) =>
                                    item.toLowerCase().includes(category.toLowerCase())
                                )}
                                keyExtractor={(item) => item}
                                nestedScrollEnabled={true}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.historyItem}
                                        onPress={() => {
                                            setCategory(item);
                                            setIsFocusedCategory(false);
                                        }}
                                    >
                                        <Text style={styles.historyItemText}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    )}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Payment</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        value={paymentMethod}
                        placeholder="Enter the payment"
                        placeholderTextColor="#cbc8c8"
                        onChangeText={(paymentMethod) => setPaymentMethod(paymentMethod)}
                        onFocus={() => setIsFocusedPayment(true)}
                        onBlur={() => setIsFocusedPayment(false)}
                    />

                    {isFocusedPayment && (
                        <View style={{ maxHeight: 110, width: '100%' }}>
                            <FlatList
                                data={paymentMethodHistory.filter((item) =>
                                    item.toLowerCase().includes(paymentMethod.toLowerCase())
                                )}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.historyItem}
                                        onPress={() => {
                                            setPaymentMethod(item);
                                            setIsFocusedPayment(false);
                                        }}
                                    >
                                        <Text style={styles.historyItemText}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                            </View>
                    )}
                </View>

                

                <View>
                    <Text>Category</Text>
                    <TextInput
                         />
                </View>

            </ScrollView>



            {/*save*/}
            <TouchableOpacity 
                style={styles.createBtn}
                onPress={() => {
                    handleCreateTransaction()
                    setAmount("");
                    setLocation("");
                    createCategory();
                    createPaymentMethod();
                }}
            >
                <Text style={styles.createBtnText}>Create</Text>
            </TouchableOpacity>

            
        
        </View>
    </KeyboardAvoidingView>
  )
}

export default Create