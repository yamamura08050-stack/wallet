import { useSignIn } from '@clerk/clerk-expo'
import { Image, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSocialAuth } from "@/hooks/useSocialAuth"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React from 'react'

export default function Page() {
  
  const { signIn, setActive, isLoaded } = useSignIn()
  const {handleSocialAuth, isLoading} = useSocialAuth();

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  const router = useRouter()

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (

    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}>
      <View style={styles.container}>

        {/*Header*/}
        <View style={styles.header}>
          <Text style={styles.title}>Sign in to wallet</Text>
          <Text style={styles.subtitle}>Welcome back! Please sign in to continue</Text>
        </View>

        <View style={styles.oAuthContainer}>

          {/*Google Button*/}
          <TouchableOpacity style={styles.socialAuthButton}>
            <Image style={styles.googleIcon}
                    source={require("../../assets/images/google.png")}
                    resizeMode="contain"
                  />
            <Text style={styles.socialAuthText}>Google</Text>
          </TouchableOpacity>

          {/*Apple Button*/}
          <TouchableOpacity style={styles.socialAuthButton}>
            <Image style={styles.appleIcon}
                    source={require("../../assets/images/apple.png")}
                    resizeMode="contain"
                  />
            <Text style={styles.socialAuthText}>Apple</Text>
          </TouchableOpacity>

        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 16 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: '#515152' }} />
          <Text style={{ marginHorizontal: 8, color: '#ffffff' }}>or</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: '#515152' }} />
        </View>



        {/*Email signin*/}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>email</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Enter your email address"
            placeholderTextColor="white"
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
            
          />
          <Text style={styles.inputLabel}>password</Text>
          <TextInput
            value={password}
            placeholder="Enter your password"
            placeholderTextColor="white"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            style={styles.input}
          />
          <TouchableOpacity  onPress={onSignInPress} style={styles.signInButton}>
            <Text style={styles.signInText}>Continue</Text>
          </TouchableOpacity>
        </View>

        {/*Footer*/}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don&apos;t have an account?</Text>
          <Link href="/sign-up">
            <TouchableOpacity>
              <Text style={styles.footerLinkText}>Sign up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap:10,
    backgroundColor: "black"
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
    fontSize: 30,
  },
  subtitle: {
    color: "white",
    fontSize: 17
  },
  oAuthContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 9,
    marginTop: 23
  },
  socialAuthButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.2,          // 枠の太さ
    borderColor: "white",     // 枠の色（黒）
    borderRadius: 10,   
    paddingTop: 2,    // 0.75rem ≒ 12px
    paddingBottom: 2, // 0.75rem ≒ 12px
    paddingLeft: 32,   // 1.5rem ≒ 24px
    paddingRight: 43,  // 1.5rem ≒ 24px｀
  },
  googleIcon: {
    width: 34,     // size-10（カスタムスケール）
    height: 34,    // size-10
    marginRight: 4 // mr-3
  },
  appleIcon: {
    width: 23,
    height: 23,
    marginRight: 10
  },
  socialAuthText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17
  },

  inputContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 100,
    gap: 15
  },
  inputLabel: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15
  },
  input: {
    fontSize: 15,
    width: 350,     
    backgroundColor: "#323234",    
    borderRadius: 6, 
    paddingTop: 7,    // 0.75rem ≒ 12px
    paddingBottom: 7, // 0.75rem ≒ 12px
    paddingLeft: 15,   // 1.5rem ≒ 24p 
    
  },
  signInButton: {
    color: "white"
  },
  signInText: {
    color: "white",
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    gap: 3,
  },
  footerText: {
    color: "white",
  },
  footerLinkText: {
    color: "white",
    fontWeight: "bold"
  }
})
