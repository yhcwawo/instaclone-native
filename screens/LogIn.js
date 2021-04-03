import React, { useEffect, useRef } from "react";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";
import AuthButton from "../components/auth/AuthButton";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { isLoggedInVar, logUserIn } from "../apollo";

const LOG_IN_MUTATION = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            ok
            token
            error
        }
    }
`;

export default function Login({route: {params}}) {
    const { register ,handleSubmit, setValue, watch} = useForm({
        defaultValues: {
            password: params?.password,
            username: params?.username,
        }
    });
    const passwordRef = useRef();
    const onCompleted = async(data) => {

        const {
            login:  {ok, token},
        } = data;
        if(ok){
            await logUserIn(token);
        }
    };
    const [logInMutation, {loading}] = useMutation(LOG_IN_MUTATION, {
        onCompleted,
    });
    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    };

    const onValid = (data) => {
        if(!loading){
            logInMutation({
                variables: {
                    ...data,
                }
            })
        }
    };

    useEffect(() => {
        register("username", {
            required: true,
        });
        register("password", {
            required: true,
        });
    }, [register]);

    return(
        <AuthLayout>
            <TextInput 
                value={watch("username")}
                placeholder="Username" 
                placeholderTextColor="gray"
                returnKeyType="next"
                autoCapitalize="none"
                onSubmitEditing = {()=> onNext(passwordRef)}
                onChangeText={(text) => setValue("username", text)}
            />

            <TextInput 
                value={watch("password")}
                ref={passwordRef}
                placeholder="Password" 
                placeholderTextColor="gray"
                secureTextEntry 
                returnKeyType="done"
                lastOne={true}
                onSubmitEditing={handleSubmit(onValid)}
                onChangeText={(text) => setValue("password", text)}
            />

            <AuthButton text="Log In" 
                disabled={!watch("username") || !watch("password")} 
                onPress={handleSubmit(onValid)} 
                loading={loading}
            />

        </AuthLayout>
    );
}