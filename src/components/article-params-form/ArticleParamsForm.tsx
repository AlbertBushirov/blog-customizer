import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';
import { Separator } from 'components/separator';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	const [open, setOpen] = useState(false);

	const clickOpen = () => {
		setOpen(!open);
	};

	return (
		<>
			<ArrowButton onClick={clickOpen} isOpen={open} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: open,
				})}>
				<form className={styles.form}>
					<Text as='h2' size={31} weight={800} align='left' uppercase>
						Задайте параметры
					</Text>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
