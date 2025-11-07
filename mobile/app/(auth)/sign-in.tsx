import { useSignIn } from '@clerk/clerk-expo'
import { Image } from 'react-native';
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSocialAuth } from "@/hooks/useSocialAuth"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from "@/assets/styles/auth.styles.js"
import { Ionicons } from '@expo/vector-icons';
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

          <TouchableOpacity  style={{ backgroundColor: "white", marginTop: 40, paddingVertical: 10, borderRadius: 10}} onPress={onSignInPress}>
            <Text style={styles.signInText}>Continue </Text>
          </TouchableOpacity>
        </View>

        {/*Footer*/}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don&apos;t have an account?</Text>
          <Link href="/sign-up" asChild>
            <TouchableOpacity>
              <Text style={styles.footerLinkText}>Sign up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
};
