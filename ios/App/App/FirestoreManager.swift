import Foundation
import FirebaseFirestore

class FirestoreManager {
    static let shared = FirestoreManager()
    private let db = Firestore.firestore()
    
    private init() {}
    
    func registrarUsuario(
        uid: String,
        datos: [String: Any],
        completion: @escaping (Error?) -> Void
    ) {
        let profileData: [String: Any] = [
            "uid": uid,
            "email": datos["email"] as? String ?? "",
            "name": datos["name"] as? String ?? "",
            "lastName": datos["lastName"] as? String ?? "",
            "age": datos["age"] as? Int ?? 0,
            "phone": datos["phone"] as? String ?? "",
            "studentId": datos["studentId"] as? String ?? "",
            "career": datos["career"] as? String ?? "",
            "semester": datos["semester"] as? String ?? "",
            "campus": datos["campus"] as? String ?? "",
            "program": datos["career"] as? String ?? "",
            "period": "2024-A",
            "createdAt": Timestamp(date: Date()),
            "avatar": "assets/avatar-placeholder.jpg"
        ]
        
        db.collection("usuarios").document(uid).setData(profileData) { error in
            completion(error)
        }
    }
    
    func guardarPerfilEstudiante(
        uid: String,
        perfil: [String: Any],
        completion: @escaping (Error?) -> Void
    ) {
        db.collection("perfiles_estudiantes").document(uid).setData(perfil) { error in
            completion(error)
        }
    }
    
    func agregarDocumento(datos: [String: Any], coleccion: String, completion: @escaping (Error?) -> Void) {
        db.collection(coleccion).addDocument(data: datos) { error in
            completion(error)
        }
    }
    
    func obtenerDocumentos(coleccion: String, completion: @escaping ([QueryDocumentSnapshot]?, Error?) -> Void) {
        db.collection(coleccion).getDocuments { (querySnapshot, error) in
            completion(querySnapshot?.documents, error)
        }
    }
}
