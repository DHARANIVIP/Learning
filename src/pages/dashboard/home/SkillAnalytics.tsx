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
          gradient.addColorStop(0, '#d1d5db');
          gradient.addColorStop(1, '#374151');
          return gradient;
        },
        borderRadius: 8,
        borderWidth: 0,
        hoverBackgroundColor: '#1A1A1A'
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
        titleFont: { size: 13, weight: 'bold' as const },
        bodyFont: { size: 12 },
        padding: 10,
        cornerRadius: 8,
        displayColors: false
      }
    },
    scales: {
      y: {
        max: 100,
        grid: { color: 'rgba(0,0,0,0.04)', drawBorder: false },
        ticks: { color: '#999999', font: { size: 10 } }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#666666', font: { size: 11, weight: 'bold' as const } }
      }
    }
  };

  const pieData = {
    labels: ['Mastered', 'In Progress', 'Yet to Learn'],
    datasets: [
      {
        data: [12, 8, 5],
        backgroundColor: [
          '#374151',
          '#9ca3af',
          '#f3f4f6'
        ],
        borderColor: '#ffffff',
        borderWidth: 3,
        hoverOffset: 10
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
          color: '#666666',
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 18,
          font: { size: 11 }
        }
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div
        className="rounded-2xl bg-white border border-[#E5E5E5] p-6 hover:-translate-y-1 transition-all duration-200"
        style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-semibold text-[#222222]">Skill Proficiency</h3>
          <span className="text-xs text-[#666666]">Top Skills</span>
        </div>
        <div className="h-[240px]">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>

      <div
        className="rounded-2xl bg-white border border-[#E5E5E5] p-6 hover:-translate-y-1 transition-all duration-200"
        style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-semibold text-[#222222]">Skill Distribution</h3>
          <span className="text-xs text-[#666666]">Overall Progress</span>
        </div>
        <div className="h-[240px]">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </div>
  );
};
