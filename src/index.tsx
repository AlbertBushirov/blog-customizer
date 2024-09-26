import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';
import clsx from 'clsx';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [savedParams, setSavedParams] = useState(defaultArticleState);
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': savedParams.fontFamilyOption.value,
					'--font-size': savedParams.fontSizeOption.value,
					'--font-color': savedParams.fontColor.value,
					'--container-width': savedParams.contentWidth.value,
					'--bg-color': savedParams.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onChange={(e) => setSavedParams(e)}
				onDefault={() => setSavedParams(defaultArticleState)}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
