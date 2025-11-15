import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
    backgroundColor: "black",
    flex:1,
    paddingHorizontal: 18,
    gap: 20
  },
  headerContainer: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    
  },
  headerRight: {
    backgroundColor:"#262525", 
    borderRadius: 10, 
    paddingVertical: 5, 
    paddingHorizontal: 9, 
    marginRight: 10
    
  },
  headerRightText: {
    color: "white",
    fontSize: 18
  },
  headerLeft: {
    color: "white",
    fontWeight: "bold",
    fontSize: 35

  },
  typeBtnContainer: {
    flex: 0.11,
    borderRadius: 10,
    backgroundColor: "#101010ff",
    flexDirection: "row",
    justifyContent:"center",
    alignItems: "center",
    gap: 20
    
  },
  incomeBtn: {
    borderRadius: 10,
    backgroundColor: "#2e2d2d",
    paddingVertical: 10,
    width: 180
  },
  activeIncomeBtn: {
    backgroundColor: "#30ab3dff",
  },
  incomeBtnText: {
    fontSize: 27,
    textAlign: "center",
    color: "white"
  },
  expensesBtn: {
    borderRadius: 10,
    backgroundColor: "#2e2d2d",
    paddingVertical: 10,
    width: 180
  },
  activeExpensesBtn: {
    backgroundColor: "#f55050ff",
  },
  expensesBtnText: {
    fontSize: 27,
    textAlign: "center",
    color: "white"
  },
  formContainer: {
    flex: 1,
    flexDirection: "column",
    borderRadius: 20,
    backgroundColor: "#101010ff",
    padding: 20,
  },
  inputContainer: {
    flexDirection: "column",
    width: "100%",
    marginBottom: 20
  },
  inputLabel: {
    color: "white",
    fontSize: 25
  },
  input: {
    width: "95%",
    height: 50,
    padding: 8,
    backgroundColor: "#252525ff",
    fontSize: 20,
    borderRadius: 10,
    marginLeft: 10,
    marginTop: 8,
    color: "white"
  },
  historyItem: {
    backgroundColor: "#2e2d2d",
    width: "95%",
    marginLeft: "10",
    borderWidth: 1,
    paddingVertical: 8
  },
  historyItemText: {
    color: "white",
    fontSize: 20,
    paddingLeft: 10
  },
  createBtn: {
    backgroundColor: "#2e2d2d",
    flex: 0.1,
    marginBottom: 70,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  createBtnText: {
    color: "white", 
    fontWeight: "bold", 
    fontSize: 25
  }
});