import Image from 'next/image';
import styles from './page.module.css';
import Slider from '@/components/Slider/Slider';

export default function Home() {
    return (
        <main className={styles.main}>
            <h1 className={styles.main__title}>Полезные материалы</h1>
            <p className={styles.main__description}>
                Собрали для вас полезные исследования схемы кормления и другие
                материалы, которые пригодятся для лучших результатов на вашем
                хозяйстве
            </p>
            <Slider />
        </main>
    );
}
