import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { InputProject } from '../components/Input';
import { Button, Link } from '@nextui-org/react';
import { useLazyCurrentQuery, useLoginMutation } from '../app/services/userApi';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from '../components/Error';
import { errorField } from '../utils/error-field';

type Props = {
	setSelected: (value: string) => void;
}

type Login = {
	username: string;
	password: string;
}

export const Login = ({setSelected}: Props) => {
	const {
		handleSubmit,
		control,
		formState: {errors}
	} = useForm<Login>({
		mode: 'onChange',
		reValidateMode: 'onBlur',
		defaultValues: {
			username: '',
			password: ''
		}
	});
	const [login, {isLoading}] = useLoginMutation();
	const navigate = useNavigate();
	const [error, setError] = useState('');
	const [trigerCurrentQuery] = useLazyCurrentQuery();
	const onSubmit = async (data: Login) => {
		try {
			await login(data).unwrap(); // unwrap - direct to catch
			await trigerCurrentQuery().unwrap();
			navigate('/');
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
			<p className='text-center text-small'>Do you not have an account?{' '}
				<Link
					size='sm'
					className='cursor-pointer'
					onPress={() => setSelected('sign-up')}
				> Sign Up</Link>
			</p>
			<div className="flex gap-2 justify-end">
				<Button
					fullWidth
					color="primary"
					type="submit"
					isLoading={isLoading}
				>
					Sign In
				</Button>
			</div>
		</form>
	)
}
