import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap:10,
    backgroundColor: "black",
    height: "100%",
    paddingTop: 80
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10
  },
  title: {
    color: "white",
    fontWeight: "bold",
    marginTop: 20,
    fontSize: 38,
  },
  subtitle: {
    color: "white",
    fontSize: 16,
    marginTop: 10
  },
  oAuthContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 14,
    marginTop: 23,
    width: 350
  },
  socialAuthButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.2,          // 枠の太さ
    borderColor: "white",     // 枠の色（黒）
    borderRadius: 10,   
    paddingVertical: 4, // 0.75rem ≒ 12px
    paddingLeft: 34,   // 1.5rem ≒ 24px
    paddingRight: 45,  // 1.5rem ≒ 24px｀
  },
  googleIcon: {
    width: 34,     // size-10（カスタムスケール）
    height: 34,    // size-10
    marginRight: 4 // mr-3
  },
  appleIcon: {
    width: 30,
    height:30,
    marginRight: 10,
    marginVertical:2
  },
  socialAuthText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17
  },

  inputContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    paddingHorizontal: 40
  },
  inputLabel: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 15,
    marginBottom: 10
    
  },
  input: {
    fontSize: 15,
    width: 350,     
    backgroundColor: "#323234",    
    borderRadius: 8, 
    paddingTop: 7,    // 0.75rem ≒ 12px
    paddingBottom: 7, // 0.75rem ≒ 12px
    paddingLeft: 15,   // 1.5rem ≒ 24p 
    
  },
  signInBtn: {
    marginTop: 50,
    color: "white",
  },
  signInText: {
    color: "black",
    textAlign: "center",
    fontSize: 20
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    gap: 3,
    marginTop: 40,
  },
  footerText: {
    color: "white",
  },
  footerLinkText: {
    color: "white",
    fontWeight: "bold"
  }
});
