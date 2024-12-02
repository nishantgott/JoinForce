using System.ComponentModel.DataAnnotations;

public class DocumentVerification
{
    [Key]
    public int VerificationId { get; set; }
    public int ApplicationId { get; set; }
    public string DocumentType { get; set; } // IdentityProof, EducationCertificate, etc.
    public string VerificationStatus { get; set; } // Pending, Verified, Rejected
    public string Remarks { get; set; }
}
