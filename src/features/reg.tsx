import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { InputProject } from '../components/Input';
import { Button, Link } from '@nextui-org/react';
import { useRegisterMutation } from '../app/services/userApi';
import { ErrorMessage } from '../components/Error';
import { errorField } from '../utils/error-field';

type Register = {
	username: string;
	password: string;
}

type Props = {
	setSelected: (value: string) => void;
}

export const Register = ({setSelected}: Props) => {
	const {
		handleSubmit,
		control,
		formState: {errors}
	} = useForm<Register>({
		mode: 'onChange',
		reValidateMode: 'onBlur',
		defaultValues: {
			username: '',
			password: ''
		}
	});

	const [register, {isLoading}] = useRegisterMutation();
	const [error, setError] = useState('');


	const onSubmit = async (data: Register) => {
		try {
			await register(data).unwrap();
			setSelected('login'); //change to login page
		} catch (error) {
			if(errorField(error)) {
				setError(error.data.error);
			}
		}
	}
	return (
		<form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
			<InputProject
				control={control}
				name="username"
				label="Username"
				type="text"
				required='This field is required'
			/>
			<InputProject 
				control={control}
				name="password"
				label="Password"
				type="text"
				required='This field is required'
			/>
			<ErrorMessage error={error} />
			<p className='text-center text-small'>Do you have an account?{' '}
				<Link
					size='sm'
					className='cursor-pointer'
					onPress={() => setSelected('sign-up')}
				> Sign In</Link>
			</p>
			<div className="flex gap-2 justify-end">
				<Button
					fullWidth
					color="primary"
					type="submit"
					isLoading={isLoading}
				>
					Sign Up
				</Button>
			</div>
		</form>
	)
}
