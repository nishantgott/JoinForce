using System.ComponentModel.DataAnnotations;

public class DocumentVerification
{
    [Key]
    public int VerificationId { get; set; }
    public int ApplicationId { get; set; }
    public string DocumentType { get; set; } // IdentityProof, EducationCertificate, etc.
    public string VerificationStatus { get; set; } // Pending, Verified, Rejected
    public string Remarks { get; set; }

    // Document fields
    public string Document1 { get; set; }
    public string Document1Type { get; set; }

    public string Document2 { get; set; }
    public string Document2Type { get; set; }

    public string Document3 { get; set; }
    public string Document3Type { get; set; }
}
