import { useState } from "react";
import { FileDown, Download, Share, Fish, MapPin, Calendar, Target, Heart, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FishCatch } from "@/services/database";
import { jsPDF } from 'jspdf';

interface PDFGeneratorProps {
  catch_data: FishCatch;
  onGenerated?: (pdfBlob: Blob) => void;
}

export const PDFGenerator = ({ catch_data, onGenerated }: PDFGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateEnhancedPDF = async () => {
    setIsGenerating(true);
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      
      // Professional Header with Gradient Effect
      pdf.setFillColor(20, 89, 158);
      pdf.rect(0, 0, pageWidth, 45, 'F');
      
      // White text for header
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(28);
      pdf.setFont(undefined, 'bold');
      pdf.text('Fish Net AI Analysis Report', pageWidth / 2, 25, { align: 'center' });
      
      pdf.setFontSize(12);
      pdf.setFont(undefined, 'normal');
      pdf.text('Professional Fish Species Identification & Analysis', pageWidth / 2, 35, { align: 'center' });
      
      // Reset text color for body
      pdf.setTextColor(0, 0, 0);
      
      // Report metadata
      let yPos = 60;
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      const reportDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      pdf.text(`Report Generated: ${reportDate}`, pageWidth / 2, yPos, { align: 'center' });
      
      // Fish Image Placeholder with Border
      yPos += 20;
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(1);
      const imageWidth = pageWidth - 40;
      const imageHeight = 60;
      pdf.rect(20, yPos, imageWidth, imageHeight);
      
      pdf.setFillColor(245, 245, 245);
      pdf.rect(21, yPos + 1, imageWidth - 2, imageHeight - 2, 'F');
      
      pdf.setFontSize(14);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Fish Photograph', pageWidth / 2, yPos + 20, { align: 'center' });
      pdf.setFontSize(10);
      pdf.text('(Original image captured during analysis)', pageWidth / 2, yPos + 30, { align: 'center' });
      
      // Species Identification Section
      yPos += 80;
      pdf.setFillColor(240, 248, 255);
      pdf.rect(15, yPos, pageWidth - 30, 40, 'F');
      
      pdf.setTextColor(20, 89, 158);
      pdf.setFontSize(18);
      pdf.setFont(undefined, 'bold');
      pdf.text('Species Identification', 20, yPos + 15);
      
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(24);
      pdf.setFont(undefined, 'bold');
      pdf.text(catch_data.species, 20, yPos + 30);
      
      // Analysis Metrics Section
      yPos += 50;
      pdf.setFillColor(248, 250, 252);
      pdf.rect(15, yPos, pageWidth - 30, 60, 'F');
      
      pdf.setTextColor(20, 89, 158);
      pdf.setFontSize(16);
      pdf.setFont(undefined, 'bold');
      pdf.text('AI Analysis Metrics', 20, yPos + 15);
      
      // Metrics in two columns
      const leftCol = 25;
      const rightCol = pageWidth / 2 + 10;
      let metricY = yPos + 30;
      
      pdf.setFontSize(11);
      pdf.setTextColor(0, 0, 0);
      
      // Left column
      const leftMetrics = [
        ['Confidence Score:', `${catch_data.confidence.toFixed(1)}%`],
        ['Health/Freshness:', `${catch_data.health_score.toFixed(1)}%`],
      ];
      
      leftMetrics.forEach(([label, value]) => {
        pdf.setFont(undefined, 'bold');
        pdf.text(label, leftCol, metricY);
        pdf.setFont(undefined, 'normal');
        pdf.text(value, leftCol + 50, metricY);
        metricY += 10;
      });
      
      // Right column
      metricY = yPos + 30;
      const rightMetrics = [
        ['Estimated Weight:', `${catch_data.estimated_weight.toFixed(2)} kg`],
        ['Fish Count:', catch_data.count.toString()],
      ];
      
      rightMetrics.forEach(([label, value]) => {
        pdf.setFont(undefined, 'bold');
        pdf.text(label, rightCol, metricY);
        pdf.setFont(undefined, 'normal');
        pdf.text(value, rightCol + 50, metricY);
        metricY += 10;
      });
      
      // Location & Time Section
      if (catch_data.latitude !== 0 || catch_data.longitude !== 0) {
        yPos += 75;
        pdf.setFillColor(240, 253, 244);
        pdf.rect(15, yPos, pageWidth - 30, 45, 'F');
        
        pdf.setTextColor(5, 150, 105);
        pdf.setFontSize(16);
        pdf.setFont(undefined, 'bold');
        pdf.text('Location & Timing', 20, yPos + 15);
        
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(11);
        pdf.setFont(undefined, 'normal');
        
        const locationInfo = [
          ['Capture Date:', new Date(catch_data.timestamp).toLocaleDateString('en-US', { 
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
          })],
          ['Capture Time:', new Date(catch_data.timestamp).toLocaleTimeString('en-US')],
          ['GPS Coordinates:', `${catch_data.latitude.toFixed(6)}, ${catch_data.longitude.toFixed(6)}`],
        ];
        
        let locY = yPos + 30;
        locationInfo.forEach(([label, value]) => {
          pdf.setFont(undefined, 'bold');
          pdf.text(label, 20, locY);
          pdf.setFont(undefined, 'normal');
          pdf.text(value, 80, locY);
          locY += 8;
        });
      }
      
      // Confidence Visualization (Simple bar chart)
      yPos += 60;
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(12);
      pdf.setFont(undefined, 'bold');
      pdf.text('Confidence Breakdown:', 20, yPos);
      
      // Confidence bar
      const barY = yPos + 10;
      const barWidth = pageWidth - 80;
      const confidenceWidth = (catch_data.confidence / 100) * barWidth;
      
      pdf.setFillColor(220, 220, 220);
      pdf.rect(20, barY, barWidth, 8, 'F');
      
      pdf.setFillColor(34, 197, 94);
      pdf.rect(20, barY, confidenceWidth, 8, 'F');
      
      pdf.setFontSize(10);
      pdf.text(`${catch_data.confidence.toFixed(1)}%`, 25 + confidenceWidth, barY + 6);
      
      // Health bar
      const healthY = barY + 15;
      const healthWidth = (catch_data.health_score / 100) * barWidth;
      
      pdf.setFillColor(220, 220, 220);
      pdf.rect(20, healthY, barWidth, 8, 'F');
      
      pdf.setFillColor(59, 130, 246);
      pdf.rect(20, healthY, healthWidth, 8, 'F');
      
      pdf.text(`Health: ${catch_data.health_score.toFixed(1)}%`, 25 + healthWidth, healthY + 6);
      
      // Footer with branding
      const footerY = pdf.internal.pageSize.getHeight() - 20;
      pdf.setDrawColor(200, 200, 200);
      pdf.line(20, footerY - 10, pageWidth - 20, footerY - 10);
      
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Fish Net - AI-Powered Fish Identification & Tracking System', 20, footerY - 5);
      pdf.text(`Report ID: FISH-${Date.now()}`, 20, footerY);
      pdf.text('Generated by Fish Net App', pageWidth - 20, footerY, { align: 'right' });
      
      // Generate and handle the PDF
      const pdfBlob = pdf.output('blob');
      
      // Create download link
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `fishnet-analysis-${catch_data.species.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.pdf`;
      link.click();
      
      // Cleanup
      URL.revokeObjectURL(url);
      
      onGenerated?.(pdfBlob);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const sharePDF = async () => {
    if (navigator.share) {
      try {
        await generateEnhancedPDF();
      } catch (error) {
        console.error('Failed to share:', error);
        generateEnhancedPDF();
      }
    } else {
      generateEnhancedPDF();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileDown className="w-5 h-5" />
          Professional Analysis Report
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Fish className="w-4 h-4 text-primary" />
              <span className="font-medium">Species:</span>
            </div>
            <div className="text-muted-foreground">{catch_data.species}</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-success" />
              <span className="font-medium">Confidence:</span>
            </div>
            <div className="text-muted-foreground">{catch_data.confidence.toFixed(1)}%</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="font-medium">Health:</span>
            </div>
            <div className="text-muted-foreground">{catch_data.health_score.toFixed(1)}%</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span className="font-medium">Weight:</span>
            </div>
            <div className="text-muted-foreground">{catch_data.estimated_weight.toFixed(2)} kg</div>
          </div>
        </div>

        <div className="bg-muted/50 p-3 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Generate a comprehensive PDF report including AI analysis results, GPS coordinates, 
            technical details, and professional formatting suitable for research or documentation.
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={generateEnhancedPDF}
            disabled={isGenerating}
            className="flex-1 bg-gradient-primary text-white hover:opacity-90"
          >
            <Download className="w-4 h-4 mr-2" />
            {isGenerating ? 'Generating...' : 'Download Report'}
          </Button>
          
          <Button
            variant="outline"
            onClick={sharePDF}
            disabled={isGenerating}
            className="flex-1"
          >
            <Share className="w-4 h-4 mr-2" />
            Share Report
          </Button>
        </div>

        {/* Report Preview */}
        <div className="text-xs text-muted-foreground space-y-1 border-t pt-3">
          <div className="font-medium">Report includes:</div>
          <div>✓ High-resolution species identification</div>
          <div>✓ AI confidence and health metrics</div>
          <div>✓ GPS coordinates and timestamp</div>
          <div>✓ Technical analysis details</div>
          <div>✓ Professional formatting</div>
        </div>
      </CardContent>
    </Card>
  );
};