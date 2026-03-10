import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler
);

export const SkillAnalytics = () => {
  const barData = {
    labels: ['Python', 'SQL', 'Tableau', 'R', 'Excel', 'Cloud'],
    datasets: [
      {
        label: 'Proficiency Level',
        data: [85, 70, 45, 30, 90, 40],
        backgroundColor: (context: any) => {
          const char = context.chart;
          const { ctx, chartArea } = char;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, '#AFA897');
          gradient.addColorStop(1, '#1A1A1A');
          return gradient;
        },
        borderRadius: 8,
        borderWidth: 0,
        hoverBackgroundColor: '#000000'
      }
    ]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1A1A1A',
        titleFont: { size: 14, weight: 'bold' as const },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        max: 100,
        grid: { color: 'rgba(26, 26, 26, 0.05)', drawBorder: false },
        ticks: { color: 'rgba(26, 26, 26, 0.3)', font: { size: 10 } }
      },
      x: {
        grid: { display: false },
        ticks: { color: 'rgba(26, 26, 26, 0.6)', font: { size: 11, weight: 'bold' as const } }
      }
    }
  };

  const pieData = {
    labels: ['Mastered', 'In Progress', 'Yet to Learn'],
    datasets: [
      {
        data: [12, 8, 5],
        backgroundColor: [
          '#1A1A1A',
          '#CFC8B8',
          'rgba(26, 26, 26, 0.05)'
        ],
        borderColor: '#F2F2F2',
        borderWidth: 4,
        hoverOffset: 15
      }
    ]
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'rgba(26, 26, 26, 0.6)',
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: { size: 11, weight: 'bold' as const }
        }
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="rounded-2xl bg-white border border-neutral-secondary/10 p-8 shadow-subtle">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold text-neutral-text">Skill Proficiency</h3>
          <span className="text-[10px] font-bold text-neutral-text-secondary uppercase tracking-widest">Top Skills</span>
        </div>
        <div className="h-[250px]">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-neutral-secondary/10 p-8 shadow-subtle">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold text-neutral-text">Skill Distribution</h3>
          <span className="text-[10px] font-bold text-neutral-text-secondary uppercase tracking-widest">Overall Progress</span>
        </div>
        <div className="h-[250px]">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </div>
  );
};
