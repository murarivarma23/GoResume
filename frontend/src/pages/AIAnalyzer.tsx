import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/Header";
import { Upload, FileText, CheckCircle, AlertCircle, XCircle, Sparkles } from "lucide-react";
import { analyzerAPI } from "@/lib/api"; // <-- ADDED

const AIAnalyzer = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any | null>(null); // <-- REAL DATA
  const [loading, setLoading] = useState(false); // <-- LOADING STATE
  const [error, setError] = useState<string | null>(null); // <-- ERROR STATE

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleAnalyzeResume = async () => {
    if (!uploadedFile) return;
    setLoading(true);
    setError(null);
    setAnalysisComplete(false);
    try {
      const res = await analyzerAPI.analyzeResume(uploadedFile, jobDescription);
      setAnalysisResults(res.analysis || res);
      setAnalysisComplete(true);
    } catch (e: any) {
      setError(e.message || "Failed to analyze resume.");
      setAnalysisComplete(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">AI Resume Analyzer</h1>
            <p className="text-muted-foreground">Get AI-powered insights to improve your resume</p>
          </div>

          {!analysisComplete ? (
            <div className="max-w-2xl mx-auto space-y-6">
              {/* File Upload Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Upload Your Resume
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center py-8">
                      <div className="border-2 border-dashed border-border rounded-lg p-8 hover:border-primary/50 transition-colors">
                        <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                          {uploadedFile ? uploadedFile.name : "Drop your resume here"}
                        </h3>
                        <p className="text-muted-foreground mb-4">Supports PDF, DOC, DOCX files up to 10MB</p>
                        <div>
                          <input
                            type="file"
                            id="resume-upload"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                          <Button asChild variant="hero">
                            <label htmlFor="resume-upload" className="cursor-pointer">
                              <FileText className="h-4 w-4 mr-2" />
                              Choose File
                            </label>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Job Description Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Description (Optional)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Label htmlFor="job-description">
                      Paste the job description or role you're applying for to get targeted suggestions
                    </Label>
                    <Textarea
                      id="job-description"
                      placeholder="Paste the job description here... (e.g., job requirements, responsibilities, required skills)"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      rows={6}
                      className="resize-none"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Analyze Button */}
              <div className="text-center">
                <Button 
                  onClick={handleAnalyzeResume} 
                  variant="hero" 
                  size="lg"
                  disabled={!uploadedFile || loading}
                  className="px-8"
                >
                  {loading ? (
                    <>
                      <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Analyze Resume
                    </>
                  )}
                </Button>
                {!uploadedFile && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Please upload a resume to continue
                  </p>
                )}
                {error && (
                  <p className="text-sm text-red-500 mt-2">{error}</p>
                )}
              </div>
            </div>
          ) : analysisResults ? (
            <div className="space-y-6">
              {/* Overall Score */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Resume Analysis Results
                    <Badge variant={analysisResults.overallScore >= 80 ? "default" : "secondary"}>
                      Score: {analysisResults.overallScore}/100
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4 mb-6">
                    {Object.entries(analysisResults.sections).map(([key, section]: any) => (
                      <div key={key} className="text-center p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-center mb-2">
                          {section.status === "excellent" ? (
                            <CheckCircle className="h-8 w-8 text-green-500" />
                          ) : section.status === "good" ? (
                            <AlertCircle className="h-8 w-8 text-yellow-500" />
                          ) : (
                            <XCircle className="h-8 w-8 text-red-500" />
                          )}
                        </div>
                        <h3 className="font-semibold capitalize">{key}</h3>
                        <p className="text-2xl font-bold text-primary">{section.score}%</p>
                      </div>
                    ))}
                  </div>
                  <Progress value={analysisResults.overallScore} className="h-3" />
                </CardContent>
              </Card>

              <Tabs defaultValue="suggestions" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                  <TabsTrigger value="skills">Skills Analysis</TabsTrigger>
                  <TabsTrigger value="optimization">AI Optimization</TabsTrigger>
                </TabsList>

                <TabsContent value="suggestions">
                  <Card>
                    <CardHeader>
                      <CardTitle>Improvement Suggestions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {analysisResults.suggestions.map((suggestion: any, index: number) => (
                          <div key={index} className="flex items-start gap-3 p-4 border border-border rounded-lg">
                            <div className="mt-0.5">
                              {suggestion.type === "success" ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : suggestion.type === "warning" ? (
                                <AlertCircle className="h-5 w-5 text-yellow-500" />
                              ) : (
                                <XCircle className="h-5 w-5 text-red-500" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline">{suggestion.category}</Badge>
                                <Badge variant={suggestion.priority === "high" ? "destructive" : suggestion.priority === "medium" ? "default" : "secondary"}>
                                  {suggestion.priority} priority
                                </Badge>
                              </div>
                              <p className="text-sm">{suggestion.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="skills">
                  <Card>
                    <CardHeader>
                      <CardTitle>Skills Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <h3 className="font-semibold mb-3 text-green-600">Strong Skills</h3>
                          <div className="space-y-2">
                            {analysisResults.skillAnalysis.strong.map((skill: string, index: number) => (
                              <Badge key={index} variant="default" className="mr-2 mb-2">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-3 text-red-600">Missing Skills</h3>
                          <div className="space-y-2">
                            {analysisResults.skillAnalysis.missing.map((skill: string, index: number) => (
                              <Badge key={index} variant="destructive" className="mr-2 mb-2">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-3 text-blue-600">Recommended</h3>
                          <div className="space-y-2">
                            {analysisResults.skillAnalysis.recommended.map((skill: string, index: number) => (
                              <Badge key={index} variant="secondary" className="mr-2 mb-2">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="optimization">
                  <Card>
                    <CardHeader>
                      <CardTitle>AI-Powered Optimization</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                          <h3 className="font-semibold mb-2">Original Experience Description:</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            "Worked on frontend development using React and JavaScript. Built responsive websites and improved user experience."
                          </p>
                          
                          <h3 className="font-semibold mb-2">AI-Optimized Version:</h3>
                          <p className="text-sm">
                            "Developed responsive web applications using React.js and ES6+ JavaScript, improving user engagement by 40% and reducing page load times by 25% through performance optimization techniques."
                          </p>
                          
                          <div className="flex gap-2 mt-4">
                            <Button variant="hero" size="sm">Apply Changes</Button>
                            <Button variant="outline" size="sm">Regenerate</Button>
                          </div>
                        </div>

                        <div className="p-4 bg-secondary/5 border border-secondary/20 rounded-lg">
                          <h3 className="font-semibold mb-2">Suggested Keywords to Add:</h3>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {["Agile", "Scrum", "CI/CD", "REST APIs", "Git", "Unit Testing"].map((keyword: string, index: number) => (
                              <Badge key={index} variant="outline">{keyword}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="flex gap-4 justify-center">
                <Button variant="outline" onClick={() => setAnalysisComplete(false)}>
                  Analyze Another Resume
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AIAnalyzer;