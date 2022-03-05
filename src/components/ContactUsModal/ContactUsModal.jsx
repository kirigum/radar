import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Form, Input, Button, message } from 'antd';
import MailchimpSubscribe from "react-mailchimp-subscribe";

export const ContactUsModal = ({ visible = false, onCancel = () => null }) => {
	const [form] = Form.useForm();
	const { t } = useTranslation();

	return (
		<>
			<Modal
				footer={null}
				visible={visible}
				onCancel={onCancel}
				title={t('contactUsModal.title')}
			>
				<MailchimpSubscribe
					url={process.env.REACT_APP_MAILCHIMP_URL}
					render={({ subscribe }) => (
						<Form
							form={form}
							layout="vertical"
							onFinish={({ email, description }) => {
								onCancel();

								return Promise.resolve(
									subscribe({
										[process.env.REACT_APP_MAILCHIMP_EMAIL_KEY]: email,
										[process.env.REACT_APP_MAILCHIMP_EMAIL_DESCRIPTION_KEY]: description,
									})
								)
									.then(() => message.success(t('contactUsModal.successInfo')));
							}}
						>
							<Form.Item
								name="email"
								rules={[
									{ type: 'email' },
									{ required: true }
								]}
								label={t('contactUsModal.emailLabel')}
							>
								<Input placeholder="e.g putin.hu*lo@gmail.com" />
							</Form.Item>
							<Form.Item
								name="description"
								label={t('contactUsModal.descriptionLabel')}
								rules={[{ required: true }]}
							>
								<Input.TextArea rows={4} />
							</Form.Item>
							<Form.Item shouldUpdate>
								{() => (
									<Button
										size="large"
										type="primary"
										htmlType="submit"
										disabled={
											form.getFieldsError().some(({ errors }) => Boolean(errors.length))
											|| Object.values(form.getFieldsValue()).some(value => !Boolean(value))
										}
									>
										{t('contactUsModal.submitBtnText')}
									</Button>
								)}
							</Form.Item>
						</Form>
					)}
				/>
			</Modal>
		</>
	);
};
