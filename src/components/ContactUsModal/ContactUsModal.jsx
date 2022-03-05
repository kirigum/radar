import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Form, Input, Button, message } from 'antd';

export const ContactUsModal = ({ visible = false, onCancel = () => null }) => {
	const [form] = Form.useForm();
	const { t } = useTranslation();

	const onFinish = () => {
		onCancel();
		message.success(t('contactUsModal.successInfo'));
	};

	return (
		<>
			<Modal
				footer={null}
				visible={visible}
				onCancel={onCancel}
				title={t('contactUsModal.title')}
			>
				<Form
					form={form}
					layout="vertical"
					onFinish={onFinish}
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
						<Input.TextArea rows={4} maxLength={6} />
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
			</Modal>
		</>
	);
};
