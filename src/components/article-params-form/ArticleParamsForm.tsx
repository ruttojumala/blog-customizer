import { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator'; // Импорт разделителя
import {
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	articleSettings: ArticleStateType;
	onApplySettings: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleSettings,
	onApplySettings,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [draftSettings, setDraftSettings] =
		useState<ArticleStateType>(articleSettings);
	const panelRef = useRef<HTMLDivElement>(null);

	const toggleSidebar = () => {
		setIsMenuOpen((prev) => !prev);
	};

	useEffect(() => {
		if (!isMenuOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (
				panelRef.current &&
				!panelRef.current.contains(event.target as Node)
			) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen]);

	const handleFontChange = (option: typeof draftSettings.fontFamilyOption) => {
		setDraftSettings((prev) => ({ ...prev, fontFamilyOption: option }));
	};

	const handleFontSizeChange = (
		option: typeof draftSettings.fontSizeOption
	) => {
		setDraftSettings((prev) => ({ ...prev, fontSizeOption: option }));
	};

	const handleFontColorChange = (option: typeof draftSettings.fontColor) => {
		setDraftSettings((prev) => ({ ...prev, fontColor: option }));
	};

	const handleBackgroundColorChange = (
		option: typeof draftSettings.backgroundColor
	) => {
		setDraftSettings((prev) => ({ ...prev, backgroundColor: option }));
	};

	const handleContentWidthChange = (
		option: typeof draftSettings.contentWidth
	) => {
		setDraftSettings((prev) => ({ ...prev, contentWidth: option }));
	};

	const handleApplySubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApplySettings(draftSettings);
	};

	const handleResetClick = () => {
		setDraftSettings(defaultArticleState);
		onApplySettings(defaultArticleState);
	};

	return (
		<div>
			<ArrowButton isOpen={isMenuOpen} onClick={toggleSidebar} />
			<aside
				ref={panelRef}
				className={`${styles.container} ${
					isMenuOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={handleApplySubmit}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<div className={styles.field}>
						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={draftSettings.fontFamilyOption}
							onChange={handleFontChange}
							placeholder='Выберите шрифт'
						/>
					</div>

					<div className={styles.field}>
						<RadioGroup
							name='fontSize'
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={draftSettings.fontSizeOption}
							onChange={handleFontSizeChange}
						/>
					</div>

					<div className={styles.field}>
						<Select
							title='Цвет шрифта'
							options={fontColors}
							selected={draftSettings.fontColor}
							onChange={handleFontColorChange}
							placeholder='Выберите цвет шрифта'
						/>
					</div>

					<Separator />

					<div className={styles.field}>
						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={draftSettings.backgroundColor}
							onChange={handleBackgroundColorChange}
							placeholder='Выберите цвет фона'
						/>
					</div>

					<div className={styles.field}>
						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={draftSettings.contentWidth}
							onChange={handleContentWidthChange}
							placeholder='Выберите ширину контента'
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleResetClick}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
