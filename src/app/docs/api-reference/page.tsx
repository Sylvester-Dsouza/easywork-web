import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ApiReferencePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-24 max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <Link href="/docs" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Documentation
            </Link>
            
            <Badge variant="secondary" className="mb-4">Documentation</Badge>
            <h1 className="text-4xl font-bold mb-4">API Reference</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Available commands and actions that the AI can perform on your spreadsheet.
            </p>

            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-bold mb-4">Available Actions</h2>
                <p className="text-muted-foreground mb-6">
                  The AI can perform the following actions on your spreadsheet:
                </p>
                
                <div className="space-y-6">
                  <Card>
                    <CardContent className="py-4">
                      <h3 className="font-semibold text-lg mb-2">write_cell</h3>
                      <p className="text-sm text-muted-foreground mb-3">Write a value to a single cell.</p>
                      <div className="bg-muted rounded p-3">
                        <code className="text-sm">
                          {`{"type": "write_cell", "cell": "B2", "value": "Hello World"}`}
                        </code>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="py-4">
                      <h3 className="font-semibold text-lg mb-2">fill_column</h3>
                      <p className="text-sm text-muted-foreground mb-3">Fill multiple cells in a column with values.</p>
                      <div className="bg-muted rounded p-3">
                        <code className="text-sm">
                          {`{"type": "fill_column", "column": "B", "startRow": 2, "values": ["val1", "val2", "val3"]}`}
                        </code>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="py-4">
                      <h3 className="font-semibold text-lg mb-2">write_range</h3>
                      <p className="text-sm text-muted-foreground mb-3">Write values to a range of cells.</p>
                      <div className="bg-muted rounded p-3">
                        <code className="text-sm">
                          {`{"type": "write_range", "range": "B2:C4", "values": [["b2","c2"],["b3","c3"],["b4","c4"]]}`}
                        </code>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="py-4">
                      <h3 className="font-semibold text-lg mb-2">create_formula</h3>
                      <p className="text-sm text-muted-foreground mb-3">Add a formula to a cell.</p>
                      <div className="bg-muted rounded p-3">
                        <code className="text-sm">
                          {`{"type": "create_formula", "cell": "D1", "formula": "=SUM(A1:C1)"}`}
                        </code>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Response Format</h2>
                <p className="text-muted-foreground mb-4">
                  The AI responds with a JSON object containing a message and actions:
                </p>
                <Card className="bg-muted">
                  <CardContent className="py-4">
                    <pre className="text-sm overflow-x-auto">
{`{
  "message": "I've filled column B with product descriptions.",
  "actions": [
    {
      "type": "fill_column",
      "column": "B",
      "startRow": 2,
      "values": ["Description 1", "Description 2", "Description 3"]
    }
  ]
}`}
                    </pre>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Context Information</h2>
                <p className="text-muted-foreground mb-4">
                  The AI receives the following context about your spreadsheet:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong>Sheet Name:</strong> The name of the active sheet</li>
                  <li><strong>Row Count:</strong> Total number of rows with data</li>
                  <li><strong>Column Headers:</strong> Names of all columns</li>
                  <li><strong>All Data:</strong> Complete data from column A for processing</li>
                  <li><strong>Sample Data:</strong> First 5 rows for reference</li>
                  <li><strong>Selected Range:</strong> Currently selected cells (if any)</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-between mt-16 pt-8 border-t">
              <Link href="/docs/configuration" className="text-muted-foreground hover:text-primary">
                <ArrowLeft className="h-4 w-4 inline mr-2" />
                Configuration
              </Link>
              <Link href="/docs/examples" className="text-primary hover:underline">
                Examples
                <ArrowRight className="h-4 w-4 inline ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
