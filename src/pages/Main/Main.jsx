import React, { useState, useEffect } from 'react';
import {
	List,
	Button,
	Layout,
	Divider,
	Cascader,
} from 'antd'
import { useTranslation } from 'react-i18next';
import { GithubOutlined } from '@ant-design/icons';

import { ContactUsModal } from '../../components/ContactUsModal/ContactUsModal';

import { normalizeOption, fetchWithTimeout, getInfoAboutWatchedCity } from './utils';

import { TG_CHANEL_LIST, CITY_LIST, REGION_LIST } from './constatnts';

import audioSrc from '../../media/alert.mp3';

const { Header, Content, Footer } = Layout;

const initWatchedCity = JSON.parse(localStorage.getItem('watchedCity'));

const pollingAlertNotificationService = async () => {
	try {
		await fetchWithTimeout('https://jsonplaceholder.typicode.com/users');

		setTimeout(pollingAlertNotificationService, 5000);
	} catch(err) {
		if (err.code === 20) {
			setTimeout(pollingAlertNotificationService, 0);
		} else {
			setTimeout(pollingAlertNotificationService, 5000);
		}
	}
};

export const Main = () => {
	const { t, i18n } = useTranslation();
	const [audio] = useState(new Audio(audioSrc));
	const [showAlert, setShowAlert] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [watchedCity, setWatchedCity] = useState(initWatchedCity);
	
	useEffect(() => {
		pollingAlertNotificationService();
	}, []);
	
	useEffect(() => {
		if (showAlert) {
			audio.play();
		} else {
			audio.pause();
		}
	}, [showAlert, audio]);
	
	const currentLanguage = i18n.language;
	const options = normalizeOption(CITY_LIST, REGION_LIST);

	const filterOptions = (inputValue, path) =>
		path.some(option => option.label?.toLowerCase().indexOf(inputValue?.toLowerCase()) > -1);

	const onChangeCityHandler = (value = null) => {
		setWatchedCity(value);
		localStorage.setItem('watchedCity', JSON.stringify(value));
	};

	const handleChangeLanguage = () =>
    i18n.changeLanguage(currentLanguage === 'ua' ? 'ru' : 'ua');

	return (
		<>
			<ContactUsModal
				visible={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
			/>

			<Layout>
				<Header>
					<div className='radarLoader' />
					<div className='languageSelector'>
						<button
							className="languageBtn"
							onClick={handleChangeLanguage}
							disabled={currentLanguage === 'ua'}
						>
							UA
						</button>
						<button
							className="languageBtn"
							onClick={handleChangeLanguage}
							disabled={currentLanguage === 'ru'}
						>
							RU
						</button>
					</div>
				</Header>

				<Content>
					{showAlert && (
						<div className="alertNotification">
							<h1>{t('mainPage.alertNotification.title')}</h1>
							<h2>{t('mainPage.alertNotification.subTitle')}</h2>
							<Button
								htmlType="button"
								onClick={() => setShowAlert(false)}
							>
								{t('mainPage.alertNotification.stopBtnText')}
							</Button>
						</div>
					)}

					<h1 className="pageTitle">{t('mainPage.title')}</h1>
					<div className="contentWrapper">
						<Cascader
							size="large"
							options={options}
							value={watchedCity}
							placeholder={t('mainPage.selectCityPlaceholder')}
							onChange={onChangeCityHandler}
							showSearch={{ filter: filterOptions }}
						/>
						<h3 className={watchedCity ? '' : 'hidden'}>{t('mainPage.watchedCity', { city: getInfoAboutWatchedCity(CITY_LIST, REGION_LIST, watchedCity) })}</h3>
					</div>

					<Divider orientation="center">{t('mainPage.hawToUse.title')}</Divider>
					<div className="howToUseWrapper">
						<p>{t('mainPage.hawToUse.selectCityInfo')}</p>
						<p>
							<strong>{t('mainPage.hawToUse.important')}</strong>
							{t('mainPage.hawToUse.slipModeInfo')}
							<a href="http://poradu24.com/dim/yak-vidklyuchiti-splyachij-rezhim-v-windows-7-8-10-na-noutbuci-pri-zakritti-krishki.html" target="_blank" rel="noreferrer">{t('mainPage.hawToUse.hereLink')}</a>.
						</p>
						<p><strong>{t('mainPage.hawToUse.important')}</strong>{t('mainPage.hawToUse.notCloseTabInfo')}</p>
					</div>

					<Divider orientation="center">{t('mainPage.listTGChannelsTitle')}</Divider>
					<div className="contentWrapper">
						<List
							size="small"
							className="list"
							dataSource={TG_CHANEL_LIST}
							renderItem={item => (
								<List.Item>
									<a href={item} target="_blank" rel="noreferrer">{item}</a>
								</List.Item>
							)}
						/>
					</div>
				</Content>

				<Footer>
					<p>{t('mainPage.footer.firstInfoLine')}</p>

					<p>
						{t('mainPage.footer.secondIfoLine')}
						<Button
							type="link"
							onClick={() => setIsModalVisible(true)}
						>
							{t('mainPage.footer.openModalBtnText')}
						</Button>.
					</p>

					<a
						target="_blank"
						rel="noreferrer"
						className="gitHubLink"
						href="https://github.com/ukraineopposite/radar"
					>
						<GithubOutlined />
					</a>
				</Footer>
			</Layout>
		</>
	);
};
