import * as React from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { styles } from "@/assets/styles/auth.styles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <>
        <Text>Verify your email</Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity onPress={onVerifyPress}>
          <Text>Verify</Text>
        </TouchableOpacity>
      </>
    )
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
              <Text style={styles.title}>Sign up to wallet</Text>
              <Text style={styles.subtitle}>Welcome! Please sign up to get started</Text>
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
              <Text style={styles.inputLabel}>Email</Text>
              <View style={{ flexDirection: "row",
                                      alignItems: "center",
                                      backgroundColor: "#323234",
                                      borderWidth: 1,
                                      borderColor: "#ccc",
                                      borderRadius: 10,
                                      paddingHorizontal: 10,}}>
               <Ionicons name="mail-outline" size={20} color="white"/>
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  value={emailAddress}
                  placeholder="Enter your email address"
                  placeholderTextColor="white"
                  onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
                  
                />
              </View>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={{flexDirection: "row",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: "#ccc",
                        borderRadius: 10,
                        paddingHorizontal: 10,
                        backgroundColor: "#323234",}}>
                <Ionicons name="lock-closed-outline" size={20} color="white" />
                <TextInput
                  value={password}
                  placeholder="Enter your password"
                  placeholderTextColor="white"
                  secureTextEntry={true}
                  onChangeText={(password) => setPassword(password)}
                  style={styles.input}
                />
                <TouchableOpacity>
                  <Ionicons name="eye-off-outline" size={20} color="white" style={{marginLeft:125}}/>
                </TouchableOpacity>
                </View>
                
              <Text style={styles.inputLabel}>Confirm Password</Text>
               <View style={{flexDirection: "row",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: "#ccc",
                        borderRadius: 10,
                        paddingHorizontal: 10,
                        backgroundColor: "#323234",}}>
                <Ionicons name="lock-closed-outline" size={20} color="white" />
                <TextInput
                  value={password}
                  placeholder="Re-enter your password"
                  placeholderTextColor="white"
                  secureTextEntry={true}
                  onChangeText={(password) => setPassword(password)}
                  style={styles.input}
                />
                <TouchableOpacity>
                  <Ionicons name="eye-off-outline" size={20} color="white" style={{marginLeft:100}}/>
                </TouchableOpacity>
              </View>

              <TouchableOpacity  style={{ backgroundColor: "white", marginTop: 40, paddingVertical: 10, borderRadius: 10}} onPress={onSignUpPress}>
                <Text style={styles.signInText}>Sign up </Text>
              </TouchableOpacity>
            </View>
    
            {/*Footer*/}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Don&apos;t have an account?</Text>
              <Link href="/sign-up" asChild>
                <TouchableOpacity>
                  <Text style={styles.footerLinkText}>Sign in</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </KeyboardAwareScrollView>
  )
}