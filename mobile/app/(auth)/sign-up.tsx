import * as React from 'react'
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { styles } from "@/assets/styles/auth.styles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react'
import { useSocialAuth } from '@/hooks/useSocialAuth';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')
  const {handleSocialAuth, isLoading} = useSocialAuth();

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
      <View style={{ backgroundColor: "black", height:"100%" ,display: "flex", flexDirection: "column", justifyContent:"center" ,gap: 35, paddingBottom: 120 }}>
        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize:30 }}>Verify your email</Text>
        <TextInput style={{ color: "white" ,fontSize: 18,backgroundColor: "#323234", borderRadius: 8, paddingVertical: 10, paddingLeft:10, marginHorizontal:"45" }}
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity onPress={onVerifyPress}  style={{ backgroundColor: "white",borderRadius: 8, paddingVertical: 6, marginHorizontal:"80" }}>
          <Text style={{ color: "black", textAlign:"center", fontSize: 20 }}>Verify</Text>
        </TouchableOpacity>
      </View>
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
              <TouchableOpacity 
              onPress={() => handleSocialAuth("oauth_google")}
              disabled={isLoading}
              style={[
                  styles.socialAuthButton, 
                  {
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                    elevation: 2,
                  },
                ]}
              >
                {isLoading ? (
                  <ActivityIndicator size='small' color="white" />
                ) : (
                  <>
                    <Image style={styles.googleIcon}
                          source={require("../../assets/images/google.png")}
                          resizeMode="contain"
                        />
                    <Text style={styles.socialAuthText}>Google</Text>
                  </>
                )}
              </TouchableOpacity>
    
              {/*Apple Button*/}
              <TouchableOpacity 
              onPress={() => handleSocialAuth("oauth_apple")}
              disabled={isLoading}
              style={[
                  styles.socialAuthButton, 
                  {
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                    elevation: 2,
                  },
                ]}
              >
              {isLoading ? (
                <ActivityIndicator size='small' color="white" />
              ) : (
                <>
                  <Image style={styles.appleIcon}
                        source={require("../../assets/images/apple.png")}
                        resizeMode="contain"
                      />
                <Text style={styles.socialAuthText}>Apple</Text>
                </>
              )}
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

              {/*Password*/}
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
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <Ionicons name="eye-outline" size={20} color="white" />
                  ) : (
                    <Ionicons name="eye-off-outline" size={20} color="white" />
                  )}
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
                  onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                  style={styles.input}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <Ionicons name="eye-outline" size={20} color="white" />
                  ) : (
                     <Ionicons name="eye-off-outline" size={20} color="white" />
                  )}
                </TouchableOpacity>
              </View>

              <TouchableOpacity  style={styles.signBtn} onPress={onSignUpPress}>
                {isLoading ? (
                    <ActivityIndicator size='small' color="white" />
                ) : (
                    <Text style={styles.signInText}>Sign up </Text>
                )}
              </TouchableOpacity>
            </View>
    
            {/*Footer*/}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Don&apos;t have an account?</Text>
              <Link href="/sign-in" asChild>
                <TouchableOpacity>
                  <Text style={styles.footerLinkText}>Sign in</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </KeyboardAwareScrollView>
  )
}