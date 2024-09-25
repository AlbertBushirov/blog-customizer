import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Text } from 'components/text';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useEffect, useState } from 'react';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import {
	defaultArticleState,
	ArticleStateType,
	fontFamilyOptions,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from 'src/constants/articleProps';

type Props = {
	onChange: ({}: ArticleStateType) => void;
	onDefault: () => void;
};

export const ArticleParamsForm = ({ onChange, onDefault }: Props) => {
	const [size, setSize] = useState(defaultArticleState.fontSizeOption);
	const [font, setFont] = useState(defaultArticleState.fontFamilyOption);
	const [color, setColor] = useState(defaultArticleState.fontColor);
	const [width, setWidth] = useState(defaultArticleState.contentWidth);
	const [background, setBackground] = useState(
		defaultArticleState.backgroundColor
	);
	const [isOpen, setIsOpen] = useState(false);
	const [params, setParams] = useState(defaultArticleState);
	const sedebarRef = useRef<HTMLDivElement>(null);

	const toggleForm = () => {
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		if (!isOpen) return;

		const handleCloseClick = (e: MouseEvent) => {
			if (
				sedebarRef.current &&
				!sedebarRef.current.contains(e.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleCloseClick);
		return () => {
			document.removeEventListener('mousedown', handleCloseClick);
		};
	}, [isOpen, sedebarRef]);

	useOutsideClickClose({
		isOpen,
		rootRef: sedebarRef,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
	});

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onChange({
			fontSizeOption: size,
			fontFamilyOption: font,
			fontColor: color,
			backgroundColor: background,
			contentWidth: width,
		});
		setIsOpen(false);
	};

	const onReset = () => {
		setSize(defaultArticleState.fontSizeOption);
		setFont(defaultArticleState.fontFamilyOption);
		setColor(defaultArticleState.fontColor);
		setBackground(defaultArticleState.backgroundColor);
		setWidth(defaultArticleState.contentWidth);

		onDefault();
		setIsOpen(false);
	};

	return (
		<>
			<div ref={sedebarRef}>
				<ArrowButton onClick={toggleForm} isOpen={isOpen} />
				{isOpen && (
					<aside
						ref={sedebarRef}
						className={styles.container}
						style={{ transform: isOpen ? 'translate(0)' : '' }}>
						<form className={styles.form} onSubmit={onSubmit} onReset={onReset}>
							<Text as='h2' size={31} weight={800} align='left' uppercase>
								Задайте параметры
							</Text>
							{/* Шрифт */}
							<Select
								selected={font}
								onChange={setFont}
								options={fontFamilyOptions}
								title='Шрифт'></Select>
							{/* Размер шрифта */}
							<RadioGroup
								selected={size}
								name='radio'
								onChange={setSize}
								options={fontSizeOptions}
								title='Размер шрифта'></RadioGroup>
							{/* Цвет фона */}
							<Select
								selected={background}
								onChange={setBackground}
								options={backgroundColors}
								title='Цвет фона'></Select>
							{/* Размер контента */}
							<Select
								selected={width}
								onChange={setWidth}
								options={contentWidthArr}
								title='Ширина контента'></Select>
							{/*Кнопки Применить сбросить */}
							<div className={styles.bottomContainer}>
								<Button title='Сбросить' type='reset' />
								<Button title='Применить' type='submit' />
							</div>
						</form>
					</aside>
				)}
			</div>
		</>
	);
};
