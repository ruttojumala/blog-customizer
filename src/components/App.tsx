import { CSSProperties, useState } from 'react';

import { Article } from './article/Article';
import { ArticleParamsForm } from './article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from '../constants/articleProps';

import styles from '../styles/index.module.scss';

export const App = () => {
	const [articleSettings, setArticleSettings] =
		useState<ArticleStateType>(defaultArticleState);

	const handleApplySettings = (settings: ArticleStateType) => {
		setArticleSettings(settings);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleSettings.fontFamilyOption.value,
					'--font-size': articleSettings.fontSizeOption.value,
					'--font-color': articleSettings.fontColor.value,
					'--container-width': articleSettings.contentWidth.value,
					'--bg-color': articleSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				articleSettings={articleSettings}
				onApplySettings={handleApplySettings}
			/>
			<Article />
		</main>
	);
};
