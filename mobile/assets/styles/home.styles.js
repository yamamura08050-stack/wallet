import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex:1
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center",
    height: 50
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 35,
    color: "white",
    marginLeft: 25
  },
  summaryContainer: {
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 18,
    flex: 1,
    gap: 10
  },
  balanceCard: {
    flex: 0.9,
    borderRadius: 10,
    backgroundColor: "#1a1a1a"
  },
  balanceText: {
    color: "#e3e0e0ff",
    fontSize: 17,
    marginTop: 12,
    marginLeft: 15
  },
  balanceValue: {
    color: "#ffffffff",
    fontWeight: "bold",
    fontSize: 35,
    marginLeft: 10,
    marginTop: 5
  },
  balanceOption: {
    color: "#e3e0e0ff",
    marginLeft: 15,
    fontSize: 17,
  },
  summaryBottom: {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10,
    flex: 0.8,
    gap: 10,
  },
  incomeCard: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    borderRadius: 10
  },
  incomeText: {
    color: "#e3e0e0ff",
    fontSize: 20,
    marginTop: 10,
    marginLeft: 15
  },
  incomeValue: {
    color: "#43f255ff",
    fontWeight: "bold",
    fontSize: 30,
    marginLeft: 10
  },
  expensesCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
    flex: 1
  },
  expensesText: {
    color: "#e3e0e0ff",
    fontSize: 20,
    marginTop: 10,
    marginLeft: 15
  },
  expensesValue: {
    color: "#f55050ff",
    fontWeight: "bold",
    fontSize: 30,
    marginLeft: 10
  },
  chartCard: {
    marginVertical: 10,
    marginHorizontal: 18,
    flex: 0.8,
    backgroundColor: "#1a1a1a",
    borderRadius: 10

  },
  transactionText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    marginLeft: 18,
    marginBottom: 5
  },
  transactionContainer: {
    marginHorizontal: 18,
    flex:2,
    backgroundColor: "#1a1a1a",
    borderRadius: 10
  }



});